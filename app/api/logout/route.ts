import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AccessToken } from '~/shared/constants';
import { removeTokens } from '~/shared/utils/cookieWithServer';
import { httpWithAuth } from '~/shared/utils/http';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
  const headers = await removeTokens();
  const accessToken = (await cookies()).get(AccessToken)?.value || '';

  try {
    await httpWithAuth.post('/users/logout', null, {
      baseURL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } finally {
    return NextResponse.json({ message: '로그아웃 되었습니다.' }, { status: 200, headers });
  }
}
