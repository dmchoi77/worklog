export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignInPayload {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface CheckEmailPayload {
  email: string;
}

export interface CheckUsernamePayload {
  username: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
