import { NextApiRequest, NextApiResponse } from 'next';

import { logout } from '~/apis/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  logout();
  res.setHeader('Set-Cookie', ['refresh_token=; Path=/; Max-Age=0', 'access_token=; Path=/; Max-Age=0']);
  return res.status(200).json({ message: 'Successfully logged out' });
}
