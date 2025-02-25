import { Controller, Post, Body, UseGuards, Request, Logger, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { PitScoutingService } from './pit-scouting.service';
import { CreatePitScoutingDto } from './dto/create-pit-scouting.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/auth/auth.guard';

@Controller('pit-scouting')
export class PitScoutingController {
  private readonly logger = new Logger(PitScoutingController.name);

  constructor(private readonly pitScoutingService: PitScoutingService) {}

  @UseGuards(AuthGuard)
  @Post("create")
  async create(@Body() createPitScoutingDto: CreatePitScoutingDto, @Request() req: AuthenticatedRequest) {
    this.logger.log('Received request to create pit scouting');
    this.logger.debug('Request headers:', req.headers);
    this.logger.debug('Request body:', createPitScoutingDto);
    this.logger.debug('User from request:', req.user);

    if (!req.user) {
      throw new Error('User not authenticated');
    }
    
    const userId = req.user.sub;
    return this.pitScoutingService.create(createPitScoutingDto, userId);
  }

  @Get("findAll")
  async findAll(){
    return this.pitScoutingService.getPitScouting();
  }

  @Get(':teamNumber')
  async getTeamPitScouting(
    @Param('teamNumber', ParseIntPipe) teamNumber: number
  ) {
    return this.pitScoutingService.findByTeamNumber(teamNumber);
  }
}




