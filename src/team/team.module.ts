import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { AuthModule } from '../auth/auth.module';
import { PitScouting } from '../pit-scouting/pit-scouting.entity';
import { TeamMatchRecord } from '../scouting/scouting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, PitScouting, TeamMatchRecord]),
    AuthModule
  ],
  providers: [TeamService],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {} 