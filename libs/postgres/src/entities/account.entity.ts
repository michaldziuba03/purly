import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

export enum Providers {
  GOOGLE = 'google',
  GITHUB = 'github',
}

@Entity('accounts')
@Unique(['provider', 'subject'])
export class Account {
  @PrimaryColumn()
  provider: Providers;

  @PrimaryColumn()
  subject: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;
}
