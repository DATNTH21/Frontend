import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';

const allowedOrigins = [process.env.NEXT_PUBLIC_ORIGIN];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname, origin } = url;
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const session = await auth();
  console.log(session);
  // Prevent API access from different origins (CORS check)
  if (pathname.startsWith('/api') && !isAllowedOrigin) {
    return NextResponse.redirect(new URL('/unauthorized', url));
  }

  // Allow access to all APIs under `/api/access`
  if (pathname.startsWith('/api/access')) {
    return NextResponse.next();
  }

  // Allow all authentication-related APIs except for `/api/auth/session`
  if (pathname.startsWith('/api/auth') && pathname !== '/api/auth/session') {
    return NextResponse.next();
  }

  // Block access to `/api/auth/session`
  if (pathname === '/api/auth/session') {
    return NextResponse.redirect(new URL('/unauthorized', url));
  }

  // If the request is for login or sign-up and the user is logged in, redirect to console
  if ((pathname === '/login' || pathname === '/signup') && session) {
    return NextResponse.redirect(new URL('/all-project', url));
  }

  // If the user is not logged in, only allow access to login and sign-up
  const protectedRoutes = ['/all-project', '/project', '/setting'];
  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', url));
  }

  // If the user does not have an error and is trying to log out, redirect to home
  if (!session?.error && pathname === '/logout') {
    return NextResponse.redirect(new URL('/', url));
  }

  // Prevent loop during logout
  if (session?.error === 'RefreshTokenError' && pathname === '/logout') {
    return NextResponse.next(); // Allow logout to proceed
  }

  // If refresh token error, redirect to logout
  if (session?.error === 'RefreshTokenError' && pathname !== '/logout') {
    return NextResponse.redirect(new URL('/logout', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!unauthorized|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|svg|assets|public).*)']
};
