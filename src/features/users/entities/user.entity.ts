import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column() // Specifies a regular column
  name: string;

  @Column()
  email: string;
}
