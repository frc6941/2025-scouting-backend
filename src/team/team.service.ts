import { Injectable } from '@nestjs/common';
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
} 