import { Post } from '@features/posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * The user entity.
 */
@Entity()
export class User {
  @ApiProperty({ description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Username of the user' })
  @Column({
    type: 'varchar',
    length: 96,
  })
  username: string;

  @ApiProperty({ description: 'Email of the user' })
  @Column({
    type: 'varchar',
    length: 96,
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Column({
    type: 'varchar',
    length: 96,
    select: false,
  })
  password: string;

  @ApiProperty({ description: 'Date when the user was created' })
  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty({ description: 'Date when the user was last updated' })
  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
