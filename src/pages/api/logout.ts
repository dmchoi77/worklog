import { NextApiRequest, NextApiResponse } from 'next';

import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const redirectUrl =
  process.env.NODE_ENV === 'production' ? 'https://today-worklog.vercel.app/login' : 'http://localhost:8100/login';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', ['refresh_token=; Path=/; Max-Age=0', 'access_token=; Path=/; Max-Age=0']);

    const accessToken = req.cookies['access_token'];

    await http.post(
      '/users/logout',
      {},
      {
        baseURL,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.redirect(redirectUrl).json({ message: '로그아웃 처리되었습니다.' });
  }
}
