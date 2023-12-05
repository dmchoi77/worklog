class AuthToken {
  private _accessToken: string | null;

  constructor() {
    this._accessToken = null;
  }

  getToken() {
    return this._accessToken;
  }

  setToken(newToken: string) {
    this._accessToken = newToken;
  }
}

export const authToken = new AuthToken();
