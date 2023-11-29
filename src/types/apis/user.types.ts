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