import type { NextApiRequest, NextApiResponse } from 'next';

import { httpWithoutAuth, commonResponseErrorHandler } from '~/utils/http';

import type { ICommonResponse, LoginResponse } from '~/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    if (req.method === 'POST') {
      const { data } = await httpWithoutAuth.post<ICommonResponse<LoginResponse>>('/users/login', {
        username: req.body.username,
        password: req.body.password,
      });

      const { accessToken, refreshToken } = data.data;

      res.setHeader('set-Cookie', [
        `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`,
        `refresh_token=${refreshToken}; path=/; samesite=Lax; httponly; secure=true;`,
      ]);

      return res.status(200).json(data.data);
    }
  } catch (error: any) {
    const errorReponse = commonResponseErrorHandler(error);
    return res.status(errorReponse?.status || 500).json(errorReponse);
  }
}
