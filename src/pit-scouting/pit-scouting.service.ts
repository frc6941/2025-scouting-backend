import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePitScoutingDto } from './dto/create-pit-scouting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PitScouting } from './pit-scouting.entity';
import { TeamService } from "../team/team.service";
import { UserService } from "src/user/user.service";
@Injectable()
export class PitScoutingService {
  constructor(
    @InjectRepository(PitScouting)
    private pitScoutingRepository: Repository<PitScouting>,
    private teamService: TeamService,
    private userService: UserService  
  ) {}

  async create(createPitScoutingDto: CreatePitScoutingDto, userId: string) {
    const teamNumber = Number(createPitScoutingDto.teamNumber);
    const team = await this.teamService.findOrCreate(teamNumber);

    const user = await this.userService.getUserByFeishuId(userId);
    console.log(user);

    // Check if team already has pit scouting
    if (team.pitScouting) {
      // Update existing pit scouting
      Object.assign(team.pitScouting, createPitScoutingDto);
      team.pitScouting.user = user!;
      return await this.pitScoutingRepository.save(team.pitScouting);
    }

    // Create new pit scouting
    const pitScouting = this.pitScoutingRepository.create({
      ...createPitScoutingDto,
      user: user!,
      team
    });

    return await this.pitScoutingRepository.save(pitScouting);
  }

  async getPitScouting() {
    return await this.pitScoutingRepository.find();
  }

  async findByTeamNumber(teamNumber: number) {
    const pitScouting = await this.pitScoutingRepository
      .createQueryBuilder('pit')
      .leftJoinAndSelect('pit.team', 'team')
      .leftJoinAndSelect('pit.user', 'user')
      .where('team.number = :teamNumber', { teamNumber })
      .getOne();

    if (!pitScouting) {
      throw new NotFoundException(`No pit scouting found for team ${teamNumber}`);
    }

    return {
      id: pitScouting.id,
      autoType: pitScouting.autoType,
      capabilities: pitScouting.capabilities,
      chassisType: pitScouting.chassisType,
      cycleTime: pitScouting.cycleTime,
      photos: pitScouting.photos,
      teamNumber: pitScouting.team.number,
      scoutedBy: {
        name: pitScouting.user.name,
        avatar: pitScouting.user.avatar
      }
    };
  }
}