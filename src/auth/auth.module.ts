import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FeishuAuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES', '1d') },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule,
  ],
  providers: [FeishuAuthService],
  controllers: [AuthController],
  exports: [FeishuAuthService],
})
export class AuthModule {}
