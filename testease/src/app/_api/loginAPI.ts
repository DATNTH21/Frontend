import customAxios from './customAPI';

interface LoginResponse {
  token: string;
  message?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse | null> {
  try {
    const response = await customAxios.post<LoginResponse>('login', {
      email,
      password
    } as LoginRequest);

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}
