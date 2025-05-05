export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignInPayload {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
}
