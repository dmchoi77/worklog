import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import * as https from 'https';
import axios from 'axios';
import { LoginResponse } from '~/features/auth/api';
import { RefreshToken } from '~/shared/constants';
import { removeTokens, setTokens } from '~/shared/utils/cookieWithServer';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
  try {
    const refreshToken = (await cookies()).get(RefreshToken)?.value;
    const { data } = await axios.post<LoginResponse>('/users/reissue', null, {
      baseURL,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    const { accessToken, refreshToken: newRefreshToken } = data;
    const headers = await setTokens(accessToken, newRefreshToken);

    return NextResponse.json(data, { headers });
  } catch (error: any) {
    const headers = await removeTokens();
    return NextResponse.json(error.response.data, { status: error.response.status, headers });
  }
}
