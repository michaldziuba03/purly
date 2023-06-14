import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { Link } from './link.entity';

@Entity('reports')
export class Report extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alias: string;

  @Column()
  url: string;

  @Column({ name: 'destination_url' })
  destinationUrl: string;

  @Column({ default: '' })
  message: string;

  @Column()
  solved: boolean;

  @ManyToOne(() => Link, (link) => link.alias)
  @JoinColumn({ name: 'alias' })
  link: Link;
}
