import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  payload: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
