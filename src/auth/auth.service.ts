import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GetAccessTokenResponse } from './dto/access-token.dto';
import { ConfigService } from '@nestjs/config';
import { GetUserInfoResponse } from './dto/user-info.dto';
import { JwtPayload } from './auth.controller';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FeishuAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getAccessToken(
    code: string,
  ): Observable<AxiosResponse<GetAccessTokenResponse>> {
    let something = this.configService.get<string>('FEISHU_CLIENT_ID');
    console.log(something);
    console.log(this.configService.get<string>('FEISHU_CLIENT_ID'))
    console.log(this.configService.get<string>('FEISHU_CLIENT_SECRET'))
    console.log(this.configService.get<string>('FEISHU_REDIRECT_URI'))
    console.log(code)
    console.log(configService.get('JWT_SECRET'))

    return this.httpService.post(
      'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: this.configService.get<string>('FEISHU_CLIENT_ID'),
        client_secret: this.configService.get<string>('FEISHU_CLIENT_SECRET'),
        code: code,
        redirect_uri: this.configService.get<string>('FEISHU_REDIRECT_URI'),
      },
    );
  }

  getUserInfo(
    accessToken: string,
  ): Observable<AxiosResponse<GetUserInfoResponse>> {
    return this.httpService.get(
      'https://open.feishu.cn/open-apis/authen/v1/user_info',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  async getPayload(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
