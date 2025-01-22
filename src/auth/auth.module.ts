import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FeishuAuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES') },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [FeishuAuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
