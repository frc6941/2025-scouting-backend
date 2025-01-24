import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { CreateTeamRecordDto } from './dto/create-team-match-record.dto';
import { ScoutingService } from './scouting.service';
import { AuthenticatedRequest, AuthGuard } from '../auth/auth.guard';
import { HttpStatusCode } from 'axios';

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
    const userId = req.user!.sub;
    await this.scoutingService.createTeamRecord(createTeamRecordDto, userId);
  }
}
