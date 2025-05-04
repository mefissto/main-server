import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { FileTypes } from '../enums/file-types.enum';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // The name of the file as it will be stored on the server
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  name: string;

  // The original name of the file as it was uploaded by the user
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  originalName: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  path: string;

  @Column({
    type: 'enum',
    enum: FileTypes,
    default: FileTypes.IMAGE,
    nullable: false,
  })
  filetype: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  mimetype: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
