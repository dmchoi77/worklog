import { NextApiRequest, NextApiResponse } from 'next';

import * as https from 'https';

import axios from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginResponse } from '~/types/apis/user.types';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    if (req.method === 'POST') {
      const refreshToken = req.cookies['refresh_token'];
      const response = await axios.post<ICommonResponse<ILoginResponse>>(
        '/users/reissue',
        {},
        {
          baseURL,
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      res.setHeader('set-Cookie', [
        `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`,
        `refresh_token=${newRefreshToken}; path=/; samesite=Lax; httponly; secure=true;`,
      ]);

      return res.status(200).json(response.data);
    }
  } catch (error: any) {
    return res.status(error.response.data.status).json(error.response.data);
  }
}
