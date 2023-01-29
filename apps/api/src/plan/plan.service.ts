import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectStripe } from '../stripe/stripe.provider';
import Stripe from 'stripe';
import { PlanRepository } from './plan.repository';
import { planSeed } from './plan.seed';
import { TransactionManager } from '../database/transaction.manager';

@Injectable()
export class PlanService implements OnModuleInit {
  constructor(
    @InjectStripe()
    private readonly stripe: Stripe,
    private readonly planRepository: PlanRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async getPlans() {
    return this.planRepository.find();
  }

  async getNameByProductId(productId: string) {
    const plan = await this.planRepository.findOne({ productId });
    if (!plan) return;

    return plan.name;
  }

  async onModuleInit() {
    const plans = await this.planRepository.find();
    if (plans.length) {
      return;
    }

    console.log('Seed Stripe and database...');
    const t = await this.transactionManager.create();
    try {
      for (const plan of planSeed) {
        const product = await this.getOrCreateStripeProduct({
          id: plan.id,
          name: plan.name,
          description: plan.description,
          active: true,
        });

        const price = await this.getOrCreateStripePrice({
          product: product.id,
          nickname: plan.id,
          currency: plan.currency,
          unit_amount: plan.price * 100, // in grosz
          recurring: {
            interval_count: 1,
            interval: 'month',
          },
        });

        await this.planRepository.create(
          {
            name: plan.id,
            displayName: plan.name,
            priceId: price.id,
            productId: product.id,
            description: plan.description,
            price: plan.price,
            currency: plan.currency,
          },
          { transaction: t },
        );
      }

      await this.transactionManager.commit(t);
    } catch (err) {
      await this.transactionManager.abort(t);
    } finally {
      await this.transactionManager.end(t);
    }
  }

  async getOrCreateStripeProduct(params: Stripe.ProductCreateParams) {
    try {
      return await this.stripe.products.retrieve(params.id);
    } catch (err) {
      if (
        err instanceof Stripe.errors.StripeError &&
        err.code === 'resource_missing'
      ) {
        return await this.stripe.products.create({
          ...params,
        });
      }

      throw err;
    }
  }

  async getOrCreateStripePrice(params: Stripe.PriceCreateParams) {
    const prices = await this.stripe.prices.list({
      product: params.product,
    });

    if (prices.data.length) {
      return prices.data[0];
    }

    return await this.stripe.prices.create({
      ...params,
    });
  }
}
