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
    coralL1: boolean;
    coralL2: boolean;
    coralL3: boolean;
    coralL4: boolean;
    algaeProcessor: boolean;
    algaeBarge: boolean;
    climbNone: boolean;
    climbShallow: boolean;
    climbDeep: boolean;
  };

  @Column()
  chassisType: string;

  @Column()
  cycleTime: string;

  @Column('simple-array')
  photos: string[];

  @Column({ nullable: true, type: 'text' })
  comments?: string;

  @ManyToOne(() => User, (user) => user.pitScouting)
  user: User;

  @OneToOne(() => Team, (team) => team.pitScouting)
  @JoinColumn()
  team: Team;
} 