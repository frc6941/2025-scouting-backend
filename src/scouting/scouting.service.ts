import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamMatchRecord } from './scouting.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamRecordDto } from './dto/create-team-match-record.dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { UserService } from '../user/user.service';

@Injectable()
export class ScoutingService {
  constructor(
    @InjectRepository(TeamMatchRecord)
    private readonly teamMatchRecordRepository: Repository<TeamMatchRecord>,
    private readonly userService: UserService,
  ) {}

  async createTeamRecord(
    teamMatchRecordDto: CreateTeamRecordDto,
    userId: string,
  ): Promise<void> {
    const user = await this.userService.getUserByFeishuId(userId);
    const data = instanceToPlain(teamMatchRecordDto);
    const record = plainToClass(TeamMatchRecord, data);
    if (user === null) {
      throw new NotFoundException('User does not exist');
    }
    record.user = user;
    await this.teamMatchRecordRepository.save(
      plainToClass(TeamMatchRecord, data),
    );
  }
}
