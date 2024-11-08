import customAxios from './customAPI';

export async function loginUser(email: string, password: string) {
  try {
    const response = await customAxios.post('login', {
      email,
      password
    });

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}
