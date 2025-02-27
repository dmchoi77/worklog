import { NextApiResponse } from 'next';

import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, res: NextApiResponse) {
  const requestBody = await req.json();
  try {
    const response = await axios.post<{ accessToken: string; refreshToken: string }>(
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

    const newHeaders = new Headers();
    newHeaders.set('set-cookie', `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`);
    newHeaders.append('set-cookie', `refresh_token=${refreshToken}; path=/; samesite=Lax; httponly; secure=true;`);

    return NextResponse.json({ ...response.data }, { status: response.status, headers: newHeaders });
  } catch (error: any) {
    return NextResponse.json({ ...error.response.data }, { status: error.response.status });
  }
}
