import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customFetch } from '@/lib/api-client';
import { TLoginSchema, TRegisterSchema } from '@/app/(auth)/_data/auth-schema';
import { GetUserResponse, LoginResponse, LogoutResponse, RegisterResponse } from '@/types/auth';

export const getUser = async (): Promise<GetUserResponse> => {
  return customFetch.get<GetUserResponse>('/authenticate', {
    cache: 'force-cache',
    next: { revalidate: 60 }
  });
  // return new Promise((resolve) => {
  //   setTimeout(async () => {
  //     const response = await customFetch.get<GetUserResponse>('/authenticate', {
  //       cache: 'force-cache',
  //       next: { revalidate: 60 }
  //     });
  //     resolve(response);
  //   }, 8000); // 8-second delay
  // });
};

export const logout = (): Promise<LogoutResponse> => {
  return customFetch.post<LogoutResponse>('/api/v1/logout');
};

export const loginWithEmailAndPassword = (data: TLoginSchema): Promise<LoginResponse> => {
  return customFetch.post<LoginResponse>('/api/v1/login', data);
};

export type TRegisterDTO = Omit<TRegisterSchema, 'confirmPassword'>;

export const registerWithEmailAndPassword = (data: TRegisterDTO): Promise<RegisterResponse> => {
  return customFetch.post<RegisterResponse>('/api/v1/register', data);
};

const userQueryKey = ['user'];

export const useUser = () => {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: getUser
  });
};

export const useLogin = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data);
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  return mutation;
};

export const useRegister = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data);
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useLogout = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};
