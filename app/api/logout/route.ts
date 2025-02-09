import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { httpWithAuth } from '~/shared/utils/http';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
  const newHeaders = new Headers();
  newHeaders.set('set-cookie', 'refresh_token=; Path=/; Max-Age=0');
  newHeaders.append('set-cookie', 'access_token=; Path=/; Max-Age=0');
  const accessToken = cookies().get('access_token')?.value || '';

  try {
    await httpWithAuth.post(
      '/users/logout',
      {},
      {
        baseURL: baseURL,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } finally {
    return NextResponse.json({ message: '로그아웃 되었습니다.' }, { status: 200, headers: newHeaders });
  }
}
