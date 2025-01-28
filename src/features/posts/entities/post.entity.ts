import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreateMetaOptionsDto } from '../../meta-options/dtos/create-meta-options.dto';
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

  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  @Column({ type: 'simple-json', nullable: true })
  metaOptions?: CreateMetaOptionsDto[];
}
