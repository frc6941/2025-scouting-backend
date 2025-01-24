import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

export enum MatchType {
  QUAL = 'Qualification',
  PRAC = 'Practice',
  MATCH = 'Match',
  FIANL = 'Final',
}

export enum Alliance {
  RED = 'Red',
  BLUE = 'Blue',
}

export enum AutoStart {
  A = 'A',
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
  @Column({
    type: 'enum',
    enum: AutoStart,
  })
  autoStart: AutoStart;

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

  @Column()
  team: number;

  @Column(() => Autonomous)
  autonomous: Autonomous;

  @Column(() => Teleop)
  teleop: Teleop;

  @Column(() => EndAndAfterGame)
  endAndAfterGame: EndAndAfterGame;

  @ManyToOne(() => User, (user) => user.matchRecords)
  user: User;
}
