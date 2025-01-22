import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { FeishuAuthService } from './auth.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private feishuAuthService: FeishuAuthService) {}

  @Get('feishu/authenticate')
  async authenticate(@Query('code') code: string) {
    const resAccessToken = await firstValueFrom(
      this.feishuAuthService.getAccessToken(code).pipe(
        catchError((error: AxiosError) => {
          throw new ForbiddenException(error.response?.data);
        }),
      ),
    );
    const accessToken = resAccessToken.data.access_token;
    const resUserInfo = await firstValueFrom(
      this.feishuAuthService.getUserInfo(accessToken).pipe(
        catchError((error: AxiosError) => {
          throw new UnauthorizedException(error.response?.data);
        }),
      ),
    );
    const name = resUserInfo.data.name;
    const openId = resUserInfo.data.open_id;
    const avatarUrl = resUserInfo.data.avatar_url;
    // TODO: Finish JWT & User Registration
    return name;
  }
}
