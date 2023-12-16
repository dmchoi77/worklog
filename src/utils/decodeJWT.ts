import { jwtDecode } from 'jwt-decode';

interface JWTPayLoad {
  sub: string;
  iat: number;
  exp: number;
  authorities: string;
}

export const decodeJWT = (token: string): JWTPayLoad => {
  const decoded: JWTPayLoad = jwtDecode(token);
  return decoded;
};

export const getRemainExp = (token: string) => {
  const { iat, exp } = decodeJWT(token);
  return exp - iat;
};
