import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Account } from './account.entity';
import { TimestampEntity } from './timestamp.entity';

@Entity('users')
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Column({ default: 'free' })
  plan: string;

  @Column({ name: 'billing_id', nullable: true })
  billingId?: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
