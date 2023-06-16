import { Plans } from '@purly/postgres';

interface IPlan {
  name: Plans;
  priceId: string;
}

export const PLANS: IPlan[] = [
  {
    name: Plans.BASIC,
    priceId: process.env.STRIPE_BASIC_PRICE || 'price_1N6JxXJjAhwWPueyTv2izTKL',
  },
  {
    name: Plans.ENTERPRISE,
    priceId:
      process.env.STRIPE_ENTERPRISE_PRICE || 'price_1N6Jz3JjAhwWPueyjh3RTONJ',
  },
];

export const PlansNames = PLANS.map((plan) => plan.name);

export function getPlanByPriceId(priceId: string) {
  return PLANS.find((plan) => plan.priceId === priceId);
}

export function getPriceIdByPlan(planName: Plans): string {
  return PLANS.find((plan) => plan.name === planName).priceId;
}
