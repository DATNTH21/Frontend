import { cookies } from 'next/headers';

export const getAuthTokenCookie = async () => {
  if (typeof window !== 'undefined') return '';
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get('accessToken')?.value,
    refreshToken: cookieStore.get('refreshToken')?.value
  };
};

export const checkLoggedIn = async () => {
  const tokens = await getAuthTokenCookie();
  const isLoggedIn = !!tokens;
  return isLoggedIn;
};
