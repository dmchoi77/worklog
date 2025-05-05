import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { LoginResponse } from '~/features/auth/api';
import { setTokens } from '~/shared/utils/cookieWithServer';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  try {
    const response = await axios.post<LoginResponse>(
      '/users/login',
      {
        username: requestBody.username,
        password: requestBody.password,
      },
      {
        baseURL,
      },
    );

    const { accessToken, refreshToken } = response.data;

    const headers = await setTokens(accessToken, refreshToken);

    return NextResponse.json(response.data, { status: response.status, headers });
  } catch (error: any) {
    return NextResponse.json(error.response.data, { status: error.response.status });
  }
}
