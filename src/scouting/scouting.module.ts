import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMatchRecord } from './scouting.entity';
import { ScoutingController } from './scouting.controller';
import { ScoutingService } from './scouting.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMatchRecord]),
    UserModule,
    AuthModule,
    TeamModule
  ],
  controllers: [ScoutingController],
  providers: [ScoutingService],
})
export class ScoutingModule {}
