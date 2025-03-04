import { Alliance, MatchType, StopStatus } from '../scouting.entity';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CoralCount {
  @Min(0)
  @IsInt()
  l4: number;

  @Min(0)
  @IsInt()
  l3: number;

  @Min(0)
  @IsInt()
  l2: number;

  @Min(0)
  @IsInt()
  l1: number;

  @Min(0)
  @IsInt()
  dropOrMiss: number;
}

export class AlgaeCount {
  @Min(0)
  @IsInt()
  netShot: number;

  @Min(0)
  @IsInt()
  processor: number;

  @Min(0)
  @IsInt()
  dropOrMiss: number;
}

export class Autonomous {
  @IsInt()
  @Min(0)
  @Max(6)
  autoStart: number;
  
  @IsBoolean()
  leftStartingZone: boolean;

  @ValidateNested()
  @IsDefined()
  @Type(() => CoralCount)
  coralCount: CoralCount;

  @ValidateNested()
  @IsDefined()
  @Type(() => AlgaeCount)
  algaeCount: AlgaeCount;
}

export class Teleop {
  @ValidateNested()
  @IsDefined()
  @Type(() => CoralCount)
  coralCount: CoralCount;

  @ValidateNested()
  @IsDefined()
  @Type(() => AlgaeCount)
  algaeCount: AlgaeCount;
}

export class EndAndAfterGame {
  @IsEnum(StopStatus)
  stopStatus: StopStatus;

  @IsString()
  comments: string;
  
  @IsInt()
  @Min(0)
  climbingTime: number;
  
  @IsInt()
  @Min(0)
  rankingPoint: number;
  
  @IsBoolean()
  coopPoint: boolean;
  
  @IsBoolean()
  autonomousMove: boolean;
  
  @IsBoolean()
  teleopMove: boolean;
}

export class CreateTeamRecordDto {
  @IsEnum(MatchType)
  matchType: MatchType;

  @IsInt()
  @Min(0)
  matchNumber: number;

  @IsEnum(Alliance)
  alliance: Alliance;

  @IsInt()
  @Min(1)
  team: number;

  @ValidateNested()
  @Type(() => Autonomous)
  @IsDefined()
  autonomous: Autonomous;

  @ValidateNested()
  @IsDefined()
  @Type(() => Teleop)
  teleop: Teleop;

  @ValidateNested()
  @IsDefined()
  @Type(() => EndAndAfterGame)
  endAndAfterGame: EndAndAfterGame;
}
