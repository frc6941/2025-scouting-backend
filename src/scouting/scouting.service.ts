import { Injectable } from '@nestjs/common';
import { TeamMatchRecord } from './scouting.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamRecordDto } from './dto/create-team-match-record.dto';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ScoutingService {
  constructor(
    @InjectRepository(TeamMatchRecord)
    private readonly teamMatchRecordRepository: Repository<TeamMatchRecord>,
  ) {}

  async createTeamRecord(
    teamMatchRecordDto: CreateTeamRecordDto,
  ): Promise<void> {
    const data = instanceToPlain(teamMatchRecordDto);
    await this.teamMatchRecordRepository.save(
      plainToClass(TeamMatchRecord, data),
    );
  }
}
