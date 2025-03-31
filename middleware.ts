import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AccessToken } from '~/shared/constants';
import { getTodayDate } from '~/shared/utils/date';

export async function middleware(request: NextRequest) {
  const todayDate = getTodayDate();
  const { nextUrl, url, cookies } = request;

  const accessToken = cookies.get(AccessToken)?.value;
  const hasToken = !!accessToken;

  const isLoginPage = nextUrl.pathname === '/login';
  const isMainPage = nextUrl.pathname === '/';

  if (isLoginPage && hasToken) {
    return NextResponse.redirect(new URL(`/content/${todayDate}`, url));
  }

  if (isMainPage && !hasToken) {
    return NextResponse.redirect(new URL('/login', url));
  }

  if (!isLoginPage && !hasToken) {
    return NextResponse.redirect(new URL('/login', url));
  }

  if (isMainPage && hasToken) {
    return NextResponse.redirect(new URL(`/content/${todayDate}`, url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|registration).*)'],
};
