import customAxios from './customAPI';

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await customAxios.post('/register', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};