import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

enum PaymentGateways {
  STRIPE = 'stripe',
}

@Entity('billing_history')
export class Billing extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'event_id', unique: true })
  eventId: string;

  @Column()
  event: string;

  @Column({ default: PaymentGateways.STRIPE, enum: PaymentGateways })
  gateway: PaymentGateways;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;
}
