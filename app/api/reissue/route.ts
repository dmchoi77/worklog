import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import * as https from 'https';
import axios from 'axios';
import { LoginResponse } from '~/pages/login/api/types';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, res: NextResponse) {
  const newHeaders = new Headers();

  try {
    const refreshToken = cookies().get('refresh_token')?.value;
    const { data } = await axios.post<LoginResponse>(
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
    const { accessToken, refreshToken: newRefreshToken } = data;
    newHeaders.append('set-cookie', `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`);
    newHeaders.append('set-cookie', `refresh_token=${newRefreshToken}; path=/; samesite=Lax; httponly; secure=true;`);

    return NextResponse.json({ ...data }, { headers: newHeaders });
  } catch (error: any) {
    newHeaders.append('set-cookie', 'refresh_token=; Path=/; Max-Age=0');
    newHeaders.append('set-cookie', 'access_token=; Path=/; Max-Age=0');
    return NextResponse.json({ ...error.response.data }, { status: error.response.status, headers: newHeaders });
  }
}
