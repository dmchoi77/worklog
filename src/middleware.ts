import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authToken } from './utils/authToken';
import { baseURL } from './constants/url';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  console.log('🚀 ~ file: middleware.ts:8 ~ middleware ~ refreshToken:', refreshToken);
  const accessToken = authToken.getToken();
  if (!refreshToken && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!accessToken && refreshToken) {
    const response = NextResponse.next();

    fetch(new URL(`${baseURL}/users/reissue`).href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Refresh: refreshToken,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          // console.log(data);
        });
      })
      .catch((error) => {
        // console.log('Fetching error: ', error);
      });

    return response;
  }
}

export const config = {
  matcher: ['/', '/login'],
};
