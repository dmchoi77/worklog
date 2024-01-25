import { NextApiRequest, NextApiResponse } from 'next';

const parsingToken = (cookies: string) => {
  let obj: any = {};
  let pairs = cookies.split('; ');

  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    obj[pair[0]] = pair[1];
  }

  return obj;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookie = req.headers.cookie;
  if (!cookie) res.redirect(307, '/login');

  let token = parsingToken(cookie as string);

  return res.status(200).json({
    accessToken: token['access_token'],
    refreshToken: token['refresh_token'],
  });
}
