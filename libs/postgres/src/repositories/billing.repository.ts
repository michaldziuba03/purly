import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Billing } from '../entities/billing.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BillingRepository {
  constructor(
    @InjectRepository(Billing)
    private readonly billingCtx: Repository<Billing>
  ) {}

  findByUserId(userId: string) {
    return this.billingCtx.find({
      where: { userId },
      take: 100,
    });
  }
}
