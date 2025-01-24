import {
  Controller,
  ForbiddenException,
  Get, Logger,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { FeishuAuthService } from './auth.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private feishuAuthService: FeishuAuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Get('feishu/authenticate')
  async authenticate(@Query('code') code: string) {
    this.logger.log('1');
    const resAccessToken = await firstValueFrom(
      this.feishuAuthService.getAccessToken(code).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new ForbiddenException(error.response?.data);
        }),
      ),
    );
    const accessToken = resAccessToken.data.access_token;
    const resUserInfo = await firstValueFrom(
      this.feishuAuthService.getUserInfo(accessToken).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new UnauthorizedException(error.response?.data);
        }),
      ),
    );
    const name = resUserInfo.data.data.name;
    const openId = resUserInfo.data.data.open_id;
    const avatarUrl = resUserInfo.data.data.avatar_url;
    if (!(await this.userService.isUserExistByFeishuId(openId))) {
      await this.userService.createUser(name, openId, avatarUrl, [Role.USER]);
    }
    const roles = await this.userService.getUserRoleByFeishuId(openId);
    if (roles === undefined) {
      this.logger.error(`User ${name} roles empty`);
      throw new UnauthorizedException('Roles empty');
    }
    const payload: JwtPayload = { sub: openId, name, avatarUrl, roles };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

export type JwtPayload = {
  name: string;
  sub: string;
  avatarUrl: string;
  roles: Role[];
};
