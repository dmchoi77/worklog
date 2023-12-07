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

let authTokenInstance: AuthToken;

export const getAuthTokenInstance = () => {
  if (typeof window !== 'undefined') {
    // 클라이언트 환경에서는 항상 같은 인스턴스 반환
    if (!authTokenInstance) {
      authTokenInstance = new AuthToken();
    }
    return authTokenInstance;
  } else {
    // 서버 환경에서는 매 요청마다 새로운 인스턴스 반환
    return new AuthToken();
  }
};
