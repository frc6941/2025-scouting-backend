import { Module } from "@nestjs/common";
import { PitScoutingController } from "./pit-scouting.controller";
import { PitScoutingService } from "./pit-scouting.service";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";
import { TeamMatchRecord } from "src/scouting/scouting.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PitScouting } from './pit-scouting.entity';
import { TeamModule } from "../team/team.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMatchRecord, PitScouting]),
    UserModule,
    AuthModule,
    TeamModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PitScoutingController],
  providers: [PitScoutingService],
})
export class PitScoutingModule {}
