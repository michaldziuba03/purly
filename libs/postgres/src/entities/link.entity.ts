import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity('links')
export class Link extends TimestampEntity {
  @PrimaryColumn()
  alias: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ name: 'is_archived', default: false })
  isArchived: boolean;

  @Column({ default: 0 })
  clicks: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  @Exclude({ toPlainOnly: true })
  userId: string;
}
