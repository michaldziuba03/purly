import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BioBlock } from './bio-block.entity';

@Entity('bio_pages')
export class Bio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  @Exclude({ toPlainOnly: true })
  userId: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ name: 'disable_watermark', default: false })
  disableWatermark: boolean; // option for paid users

  @OneToMany(() => BioBlock, (block) => block.bio)
  blocks: BioBlock[];
}
