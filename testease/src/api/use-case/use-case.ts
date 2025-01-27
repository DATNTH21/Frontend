import { TUsecaseUpload } from '@/app/(app)/project/[projectId]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { ApiResponse } from '@/types/response';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCaseQueryKey = ['use-case'];

export const createUseCase = async (data: FormData): Promise<any> => {
  return customFetch.post<any>('/usecases', data);
};

export const handleDescriptionUpload = async (data: TUsecaseUpload) => {
  return customFetch.post<Promise<ApiResponse<{ description: string }>>>('/usecase/upload', data, { useNextApi: true });
};

export const useCreateUseCase = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-use-case'],
    mutationFn: ({ data }: { data: FormData }) => createUseCase(data),
    onSuccess: () => {
      // Revidate
      queryClient.invalidateQueries({ queryKey: useCaseQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useUseCaseDescriptionUpload = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['use-case-description-upload'],
    mutationFn: ({ data }: { data: TUsecaseUpload }) => handleDescriptionUpload(data),
    onSuccess: () => {
      // Revidate
      queryClient.invalidateQueries({ queryKey: useCaseQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};
