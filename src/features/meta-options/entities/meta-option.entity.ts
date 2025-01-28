import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * The meta option entity.
 */
@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'json' })
  metaValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
