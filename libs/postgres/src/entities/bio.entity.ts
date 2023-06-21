import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bio_pages')
export class Bio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ name: 'disable_watermark', default: false })
  disableWatermark: boolean; // option for paid users
}

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
  bioId: string;

  @Column()
  label: string;

  @Column()
  url: string;

  @Column({ name: 'link_ref' })
  linkRef: string;
}
