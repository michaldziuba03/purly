import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('links')
export class Link extends TimestampEntity {
  @PrimaryColumn()
  alias: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({ default: false })
  archived: boolean;

  @Column({ default: 0 })
  clicks: number;
}
