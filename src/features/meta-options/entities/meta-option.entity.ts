import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from '@features/posts/entities/post.entity';

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

  // This is a one-to-one bi-directional relationship
  // specify the inverse side of the relationship
  @OneToOne(() => Post, (post) => post.metaOptions, {
    onDelete: 'CASCADE', // This is required to delete the meta option when the post is deleted
  })
  @JoinColumn() // This is required to create a foreign key column in the database table
  post: Post;
}
