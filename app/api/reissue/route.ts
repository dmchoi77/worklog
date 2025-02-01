import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import * as https from 'https';
import axios from 'axios';
import { LoginResponse } from '~/pages/login/api/types';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, res: NextResponse) {
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
    const newHeaders = new Headers();
    newHeaders.set('set-cookie', `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`);
    newHeaders.append('set-cookie', `refresh_token=${newRefreshToken}; path=/; samesite=Lax; httponly; secure=true;`);

    return NextResponse.json({ ...data }, { headers: newHeaders });
  } catch (error: any) {
    return NextResponse.json({ ...error.response.data }, { status: error.response.status });
  }
}
