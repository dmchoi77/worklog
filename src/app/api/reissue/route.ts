import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import * as https from 'https';
import axios from 'axios';
import { ICommonResponse } from '~/types/apis/common.types';
import { LoginResponse } from '~/types/apis/user.types';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const refreshToken = cookies().get('refresh_token')?.value;
    const response = await axios.post<ICommonResponse<LoginResponse>>(
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
    const newHeaders = new Headers();
    newHeaders.set('set-cookie', `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`);
    newHeaders.append('set-cookie', `refresh_token=${newRefreshToken}; path=/; samesite=Lax; httponly; secure=true;`);

    return NextResponse.json({ ...response.data }, { headers: newHeaders });
  } catch (error: any) {
    return NextResponse.json({ ...error }, { status: error.status });
  }
}
