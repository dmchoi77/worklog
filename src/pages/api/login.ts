import type { NextApiRequest, NextApiResponse } from 'next';

import { getRemainExp } from '~/utils/decodeJWT';
import http from '~/utils/http';

import type { ICommonResponse, ILoginResponse } from '~/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    if (req.method === 'POST') {
      const response = await http.post<ICommonResponse<ILoginResponse>>(
        '/users/login',
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          baseURL,
        },
      );

      const { accessToken, refreshToken } = response.data.data;
      const exp = getRemainExp(refreshToken);

      res.setHeader('set-Cookie', [
        `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`,
        `refresh_token=${refreshToken}; path=/; samesite=Lax; httponly; secure=true;`,
      ]);

      return res.status(200).json(response.data.data);
    }
  } catch (error: any) {
    return res.status(error.status).json(error);
  }
}
