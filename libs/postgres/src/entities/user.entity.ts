import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
  password?: string;

  @Column({ nullable: true })
  subscribtion?: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
