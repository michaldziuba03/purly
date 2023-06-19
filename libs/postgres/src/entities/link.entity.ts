import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity('links')
export class Link extends TimestampEntity {
  @PrimaryColumn({ unique: true })
  alias: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ name: 'expires_at', nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  domain: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ default: 0 })
  clicks: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  @Exclude({ toPlainOnly: true })
  userId: string;

  @Column({ name: 'android_redirect', nullable: true })
  androidRedirect?: string;

  @Column({ name: 'ios_redirect', nullable: true })
  iosRedirect?: string;

  @Column({ name: 'enable_utm', default: false })
  enableUtm: boolean;

  @Column({ name: 'utm_source', nullable: true })
  utmSource?: string;

  @Column({ name: 'utm_medium', nullable: true })
  utmMedium?: string;

  @Column({ name: 'utm_campaign', nullable: true })
  utmCampaign?: string;

  @Column({ name: 'utm_term', nullable: true })
  utmTerm?: string;

  @Column({ name: 'utm_content', nullable: true })
  utmContent?: string;
}
