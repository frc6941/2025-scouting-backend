import { IsString, IsNumber, IsArray, IsObject, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Capabilities {
  @IsBoolean()
  amp: boolean;

  @IsBoolean()
  speaker: boolean;

  @IsBoolean()
  trap: boolean;
}

export class CreatePitScoutingDto {
  @IsString()
  autoType: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Capabilities)
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
} 