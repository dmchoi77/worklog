export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignInRequest {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ICheckEmailRequest {
  email: string;
}

export interface ICheckUsernameRequest {
  username: string;
}
