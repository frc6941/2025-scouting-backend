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
  Delete,
  Put,
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

  @Get('teams')
  async findAllMatches() {
    console.log('findAllMatches');
    return this.scoutingService.findAllMatches();
  }

  @Delete('match/:id')
  @UseGuards(AuthGuard)
  async deleteMatchRecord(@Param('id') id: string) {
    return this.scoutingService.deleteMatchRecord(id);
  }

  @Delete('team/:teamNumber/matches')
  @UseGuards(AuthGuard)
  async deleteTeamMatches(@Param('teamNumber', ParseIntPipe) teamNumber: number) {
    return this.scoutingService.deleteTeamMatches(teamNumber);
  }

  @Delete('delete/all')
  async deleteAll() {
    return this.scoutingService.deleteAll();
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  async updateMatchRecordAlternate(
    @Param('id') id: string,
    @Body() updateTeamRecordDto: any,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user!.sub;
    return this.scoutingService.update(id, updateTeamRecordDto, userId);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteMatchRecordAlternate(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.scoutingService.deleteMatchRecord(id);
  }
}
