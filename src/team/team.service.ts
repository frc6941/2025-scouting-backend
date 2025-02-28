import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { PitScouting } from '../pit-scouting/pit-scouting.entity';
import { TeamMatchRecord } from '../scouting/scouting.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(PitScouting)
    private pitScoutingRepository: Repository<PitScouting>,
    @InjectRepository(TeamMatchRecord)
    private matchRecordRepository: Repository<TeamMatchRecord>
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
    return await this.teamRepository.find({
      relations: ['pitScouting', 'matchRecords', 'pitScouting.user']
    });
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
    // First delete all pit scouting records
    await this.pitScoutingRepository.clear();
    
    // Then delete all match records
    await this.matchRecordRepository.clear();
    
    // Finally delete all teams
    await this.teamRepository.clear();
    
    return { 
      message: 'All teams and associated records deleted successfully',
      details: {
        teams: 'deleted',
        pitScouting: 'deleted',
        matchRecords: 'deleted'
      }
    };
  }
} 