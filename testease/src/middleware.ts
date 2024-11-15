import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = await fetch('http://localhost:8080/authenticate', {
    method: 'GET',
    headers: {
      cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
    }
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const setCookieHeader = response.headers.get('set-cookie');

  const accessTokenMatch = setCookieHeader?.match(/accessToken=([^;]*)/);
  if (!accessTokenMatch) return;

  const refreshTokenMatch = setCookieHeader?.match(/refreshToken=([^;]*)/);

  const newAccessToken = accessTokenMatch[1];
  const newRefreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;

  console.log({ newAccessToken: newAccessToken, newRefreshToken });

  const nextResponse = NextResponse.next();
  if (newAccessToken) {
    nextResponse.cookies.set('accessToken', String(newAccessToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }
  if (newRefreshToken) {
    nextResponse.cookies.set('refreshToken', String(newRefreshToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }

  return nextResponse;
}
export const config = {
  matcher: [
    {
      source: '/((?!signup|verify|login|assets|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    }
  ]
};

// '/((?!signup|verify|login|assets|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
