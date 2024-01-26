import { NextApiRequest, NextApiResponse } from 'next';
import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginResponse } from '~/types/apis/user.types';
import http from '~/utils/http';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const refreshToken = req.cookies['refresh_token'];
    const response = await http.post<ICommonResponse<ILoginResponse>>(
      '/users/reissue',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        baseURL,
      },
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    res.setHeader('set-Cookie', [
      `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`,
      `refresh_token=${newRefreshToken}; path=/; samesite=Lax; httponly; secure=true;`,
    ]);

    return res.status(200).json(response.data.data);
  }
}
