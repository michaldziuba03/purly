import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { Link } from './link.entity';

export enum AbuseType {
  BOTNETS = 'botnets',
  CSAM = 'csam',
  ILLEGAL_GOODS = 'illegal-goods',
  IMRERSONATTON = 'impersonation',
  MALWARE = 'malware',
  PHISHING = 'phishing',
  SPAM = 'spam',
  SPYWARE = 'spyware',
  TERRORISM = 'terrorism',
  VIOLENCE = 'violence',
}

@Entity('reports')
export class Report extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

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

  @Column({ enum: AbuseType })
  type: AbuseType;

  @ManyToOne(() => Link, (link) => link.alias)
  @JoinColumn({ name: 'alias' })
  link: Link;
}
