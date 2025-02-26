import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async findOrCreate(teamNumber: number): Promise<Team> {
    let team = await this.teamRepository.findOne({
      where: { number: teamNumber },
      relations: ['pitScouting', 'matchRecords']
    });

    if (!team) {
      team = this.teamRepository.create({ number: teamNumber });
      await this.teamRepository.save(team);
    }

    return team;
  }

  async findAll() {
    return await this.teamRepository.find();
  }

  async deleteTeam(teamNumber: number) {
    const team = await this.teamRepository.findOne({
      where: { number: teamNumber },
      relations: ['pitScouting', 'matchRecords']
    });

    if (!team) {
      throw new NotFoundException(`Team ${teamNumber} not found`);
    }

    // Delete associated records first
    if (team.pitScouting) {
      await this.teamRepository.manager.remove(team.pitScouting);
    }
    if (team.matchRecords?.length > 0) {
      await this.teamRepository.manager.remove(team.matchRecords);
    }

    // Then delete the team
    await this.teamRepository.remove(team);
    return { message: `Team ${teamNumber} and all associated records deleted successfully` };
  }

  async deleteAll() {
    await this.teamRepository.clear();
    return { message: 'All teams deleted successfully' };
  }
} 