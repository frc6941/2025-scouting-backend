import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamMatchRecord, MatchType } from './scouting.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamRecordDto } from './dto/create-team-match-record.dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { TeamService } from '../team/team.service';

@Injectable()
export class ScoutingService {
  constructor(
    @InjectRepository(TeamMatchRecord)
    private readonly teamMatchRecordRepository: Repository<TeamMatchRecord>,
    private readonly userService: UserService,
    private teamService: TeamService,
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

  async create(createDto: CreateTeamRecordDto, userId: string) {
    const user = await this.userService.getUserByFeishuId(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const team = await this.teamService.findOrCreate(createDto.team);

    const matchRecord = this.teamMatchRecordRepository.create({
      matchType: createDto.matchType,
      matchNumber: createDto.matchNumber,
      alliance: createDto.alliance,
      autonomous: createDto.autonomous,
      teleop: createDto.teleop,
      endAndAfterGame: createDto.endAndAfterGame,
      user: user,
      team: team
    });
    let response = await this.teamMatchRecordRepository.save(matchRecord)
    return response;
  }

  async findAll() {
    return await this.teamMatchRecordRepository.find({
      relations: ['user', 'team'],
    });
  }

  async findTeamMatches(teamNumber: number, matchType?: MatchType) {
    const queryBuilder = this.teamMatchRecordRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.team', 'team')
      .leftJoinAndSelect('match.user', 'user')
      .where('team.number = :teamNumber', { teamNumber });

    if (matchType) {
      queryBuilder.andWhere('match.matchType = :matchType', { matchType });
    }

    const matches = await queryBuilder
      .orderBy('match.matchNumber', 'ASC')
      .getMany();

    if (matches.length === 0) {
      throw new NotFoundException(`No matches found for team ${teamNumber}`);
    }

    return matches.map(match => ({
      id: match.id,
      matchType: match.matchType,
      matchNumber: match.matchNumber,
      alliance: match.alliance,
      autonomous: match.autonomous,
      teleop: match.teleop,
      endAndAfterGame: match.endAndAfterGame,
      scoutedBy: {
        name: match.user.name,
        avatar: match.user.avatar
      }
    }));
  }
}
