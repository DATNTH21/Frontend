import { cookies } from 'next/headers';

export default async function auth() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const response = await fetch('http://localhost:8080/authenticate', {
    method: 'GET',
    headers: {
      cookie: `${accessToken.name}=${accessToken.value}; ${refreshToken.name}=${refreshToken.value}`
    }
  });
  const { data } = await response.json();
  return data.user;
}
