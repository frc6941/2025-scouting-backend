import { Controller, Get, Delete, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { TeamService } from "./team.service";
import { AuthGuard } from 'src/auth/auth.guard';

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get("findAll")
  async findAll() {
    return this.teamService.findAll();
  }

  @Delete(':teamNumber')
  @UseGuards(AuthGuard)
  async deleteTeam(@Param('teamNumber', ParseIntPipe) teamNumber: number) {
    return this.teamService.deleteTeam(teamNumber);
  }

  @Delete('delete/all')
  async deleteAll() {
    return this.teamService.deleteAll();
  }
}
