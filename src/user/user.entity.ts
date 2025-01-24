import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamMatchRecord } from '../scouting/scouting.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
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

  @OneToMany(() => TeamMatchRecord, (record) => record.user)
  matchRecords: TeamMatchRecord[];
}
