import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { PitScouting } from 'src/pit-scouting/pit-scouting.entity';
import { Team } from '../team/team.entity';

export enum MatchType {
  QUAL = 'Qualification',
  PRAC = 'Practice',
  MATCH = 'Match',
  FINAL = 'Final',
}

export enum Alliance {
  RED = 'Red',
  BLUE = 'Blue',
}


export class CoralCount {
  @Column()
  l4: number;

  @Column()
  l3: number;

  @Column()
  l2: number;

  @Column()
  l1: number;

  @Column()
  dropOrMiss: number;
}

export class AlgaeCount {
  @Column()
  netShot: number;

  @Column()
  processor: number;

  @Column()
  dropOrMiss: number;
}

export class Autonomous {
  @Column(() => Number)
  autoStart: number;

  @Column(() => CoralCount)
  coralCount: CoralCount;

  @Column(() => AlgaeCount)
  algaeCount: AlgaeCount;
}

export class Teleop {
  @Column(() => CoralCount)
  coralCount: CoralCount;

  @Column(() => AlgaeCount)
  algaeCount: AlgaeCount;
}

export enum StopStatus {
  PARK = 'Park',
  DEEP = 'Deep Climb',
  SHALLOW = 'Shallow Climb',
  FAILED = 'Failed',
  PLAYED_DEFENSE = 'Played Defense',
}

export class EndAndAfterGame {
  @Column({
    type: 'enum',
    enum: StopStatus,
  })
  stopStatus: StopStatus;

  @Column()
  comments: string;
}

@Entity()
export class TeamMatchRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: MatchType,
  })
  matchType: MatchType;

  @Column()
  matchNumber: number;

  @Column({
    type: 'enum',
    enum: Alliance,
  })
  alliance: Alliance;

  @Column(() => Autonomous)
  autonomous: Autonomous;

  @Column(() => Teleop)
  teleop: Teleop;

  @Column(() => EndAndAfterGame)
  endAndAfterGame: EndAndAfterGame;

  @ManyToOne(() => Team, (team) => team.matchRecords)
  team: Team;

  @ManyToOne(() => User, (user) => user.matchRecords)
  user: User;
}
