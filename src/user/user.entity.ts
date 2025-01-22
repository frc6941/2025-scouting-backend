import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  feishuId: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
  })
  roles: Role[];
}
