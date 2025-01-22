import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FeishuAuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [HttpModule],
  providers: [FeishuAuthService],
  controllers: [AuthController],
})
export class AuthModule {}
