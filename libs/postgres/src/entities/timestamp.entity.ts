import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimestampEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
