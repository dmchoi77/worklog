interface SignInPayload {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface CheckEmailPayload {
  email: string;
}

interface CheckUsernamePayload {
  username: string;
}

export type { CheckEmailPayload, CheckUsernamePayload, SignInPayload };
