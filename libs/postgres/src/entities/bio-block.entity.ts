import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bio } from './bio.entity';
import { Exclude } from 'class-transformer';

export enum BlockTypes {
  BUTTON = 'button',
}

@Entity('bio_blocks')
export class BioBlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: BlockTypes })
  type: BlockTypes;

  @Column({ name: 'bio_id' })
  @Exclude({ toPlainOnly: true })
  bioId: string;

  @Column()
  label: string;

  @Column()
  url: string;

  @Column({ name: 'link_ref' })
  linkRef: string; // alias reference to link entity

  @ManyToOne(() => Bio, (bio) => bio.id)
  @JoinColumn({ name: 'bio_id' })
  bio: Bio;
}
