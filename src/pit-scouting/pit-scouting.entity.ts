import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
export class PitScouting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  autoType: string;

  @Column('json')
  capabilities: {
    amp: boolean;
    speaker: boolean;
    trap: boolean;
  };

  @Column()
  chassisType: string;

  @Column()
  cycleTime: string;

  @Column('simple-array')
  photos: string[];

  @ManyToOne(() => User, (user) => user.pitScouting)
  user: User;

  @OneToOne(() => Team, (team) => team.pitScouting)
  @JoinColumn()
  team: Team;
} 