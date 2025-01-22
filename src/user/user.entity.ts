import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  feishuId: string;

  @Column()
  name: string;

  @Column()
  avatar: string;
}
