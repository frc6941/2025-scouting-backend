import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  Get,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTeamRecordDto } from './dto/create-team-match-record.dto';
import { ScoutingService } from './scouting.service';
import { AuthenticatedRequest, AuthGuard } from '../auth/auth.guard';
import { HttpStatusCode } from 'axios';
import { MatchType } from './scouting.entity';

@Controller('scouting')
export class ScoutingController {
  constructor(private scoutingService: ScoutingService) {}

  @Post('record')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatusCode.Ok)
  async submitTeamRecord(
    @Body() createTeamRecordDto: CreateTeamRecordDto,
    @Request() req: AuthenticatedRequest,
  ) {
    console.log(createTeamRecordDto);
    const userId = req.user!.sub;
    await this.scoutingService.create(createTeamRecordDto, userId);
  }

  @Get("findAll")
  async findAll() {
    return this.scoutingService.findAll();
  }

  @Get(':teamNumber/matches')
  async getTeamMatches(
    @Param('teamNumber', ParseIntPipe) teamNumber: number,
    @Query('type') matchType?: MatchType
  ) {
    return this.scoutingService.findTeamMatches(teamNumber, matchType);
  }
}
