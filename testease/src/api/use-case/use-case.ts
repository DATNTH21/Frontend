import { TCreateUseCases } from '@/app/(app)/project/[projectId_temp]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { GetAllUsecasesResponse } from '@/types/use-case';
import { useMutation, useQuery } from '@tanstack/react-query';

const useCaseQueryKey = ['use-case'];

export const createUseCase = async (data: TCreateUseCases): Promise<any> => {
  return customFetch.post<any>('/api/v1/use-cases', data);
};

export const getAllUsecases = async (projectId: string): Promise<GetAllUsecasesResponse> => {
  return customFetch.get<GetAllUsecasesResponse>(`/api/v1/use-cases?project_id=${projectId}`);
};

export const useCreateUseCase = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationKey: ['create-use-case'],
    mutationFn: ({ data }: { data: TCreateUseCases }) => createUseCase(data),
    onSuccess: () => {
      // Revidate
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useUsecases = (projectId: string) => {
  return useQuery({
    queryKey: [...useCaseQueryKey, projectId],
    queryFn: () => getAllUsecases(projectId)
  });
};
