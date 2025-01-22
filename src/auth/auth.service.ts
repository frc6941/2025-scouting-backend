import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GetAccessTokenResponse } from './dto/access-token.dto';
import { ConfigService } from '@nestjs/config';
import { GetUserInfoResponse } from './dto/user-info.dto';

@Injectable()
export class FeishuAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getAccessToken(
    code: string,
  ): Observable<AxiosResponse<GetAccessTokenResponse>> {
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
}
