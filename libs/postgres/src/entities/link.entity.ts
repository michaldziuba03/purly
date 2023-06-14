import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { Exclude } from 'class-transformer';

@Entity('links')
export class Link extends TimestampEntity {
  @PrimaryColumn()
  alias: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  seq: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({ name: 'is_archived', default: false })
  isArchived: boolean;

  @Column({ default: 0 })
  clicks: number;
}
