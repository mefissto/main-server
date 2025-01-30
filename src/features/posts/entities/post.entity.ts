import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MetaOption } from '@features/meta-options/entities/meta-option.entity';
import { Tag } from '@features/tags/entities/tag.entity';
import { User } from '@features/users/entities/user.entity';

import { PostStatus } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';

/**
 * The post entity.
 */
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 512 })
  title: string;

  @Column({ type: 'enum', enum: PostType, default: PostType.POST })
  postType: PostType;

  @Column({ type: 'varchar', length: 256, unique: true })
  slug: string;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'text', nullable: true })
  schema?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;

  // eager: true means that when a post is fetched, the tags will also be fetched
  // inverse side needs to be set up on both sides to make the relationship bidirectional
  @ManyToMany(() => Tag, (tag) => tag.posts, { eager: true })
  @JoinTable()
  tags?: Tag[];

  // cascade: true means that when a post is saved, the metaOptions will also be saved
  // eager: true means that when a post is fetched, the metaOptions will also be fetched
  // nullable: true means that the metaOptions can be null
  // This is a one-to-one bi-directional relationship
  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (author) => author.posts)
  author: User;
}
