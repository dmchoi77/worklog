import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const nextResponse = NextResponse.next();

  if (request.nextUrl.pathname === '/login' && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname === '/' && !refreshToken && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (refreshToken && !accessToken) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/reissue`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        nextResponse.cookies.set('refreshToken', data.data?.refreshToken);
        nextResponse.cookies.set('accessToken', data.data?.accessToken);
        return nextResponse;
      } else throw data;
    } catch (e) {
      console.log('🚀 ~ file: middleware.ts:17 ~ middleware ~ e:', e);
    }
  }
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
