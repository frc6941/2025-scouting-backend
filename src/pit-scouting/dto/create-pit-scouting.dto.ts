import { IsString, IsNumber, IsArray, IsObject, IsBoolean, IsOptional } from 'class-validator';

class Capabilities {
  @IsBoolean()
  coralL1: boolean;

  @IsBoolean()
  coralL2: boolean;

  @IsBoolean()
  coralL3: boolean;

  @IsBoolean()
  coralL4: boolean;

  @IsBoolean()
  algaeProcessor: boolean;

  @IsBoolean()
  algaeBarge: boolean;

  @IsBoolean()
  climbNone: boolean;

  @IsBoolean()
  climbShallow: boolean;

  @IsBoolean()
  climbDeep: boolean;
}

export class CreatePitScoutingDto {
  @IsString()
  autoType: string;

  @IsObject()
  capabilities: Capabilities;

  @IsString()
  chassisType: string;

  @IsNumber()
  cycleTime: string;

  @IsArray()
  @IsString({ each: true })
  photos: string[];

  @IsNumber()
  teamNumber: string;

  @IsString()
  @IsOptional()
  comments?: string;
} 