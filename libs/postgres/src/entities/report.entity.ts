import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('reports')
export class Report extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alias: string;

  @Column()
  url: string;

  @Column()
  message: string;

  @Column()
  solved: boolean;
}
