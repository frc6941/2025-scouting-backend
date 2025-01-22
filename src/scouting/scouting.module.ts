import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMatchRecord } from './scouting.entity';
import { ScoutingController } from './scouting.controller';
import { ScoutingService } from './scouting.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMatchRecord])],
  controllers: [ScoutingController],
  providers: [ScoutingService],
})
export class ScoutingModule {}
