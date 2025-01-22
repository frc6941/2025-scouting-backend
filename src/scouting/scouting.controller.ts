import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeamRecordDto } from './dto/create-team-match-record.dto';
import { ScoutingService } from './scouting.service';

@Controller('scouting')
export class ScoutingController {
  constructor(private scoutingService: ScoutingService) {}

  @Post('record')
  async submitTeamRecord(@Body() createTeamRecordDto: CreateTeamRecordDto) {
    await this.scoutingService.createTeamRecord(createTeamRecordDto);
  }
}
