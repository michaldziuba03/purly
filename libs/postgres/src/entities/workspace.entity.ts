import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
