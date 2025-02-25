import { Entity, Column, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { TeamMatchRecord } from '../scouting/scouting.entity';
import { PitScouting } from '../pit-scouting/pit-scouting.entity';

@Entity()
export class Team {
  @PrimaryColumn()
  number: number;

  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => PitScouting, (pitScouting) => pitScouting.team)
  pitScouting: PitScouting;

  @OneToMany(() => TeamMatchRecord, (record) => record.team)
  matchRecords: TeamMatchRecord[];
} 