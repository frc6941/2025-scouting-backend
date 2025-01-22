export class GetAccessTokenResponse {
  code: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
  error: string;
  error_description: string;
}
