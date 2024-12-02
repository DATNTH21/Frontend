'use server';
import { customFetch } from '@/lib/api-client';

export const getUser = async (): Promise<any> => {
  return customFetch.get('/authenticate');
};
