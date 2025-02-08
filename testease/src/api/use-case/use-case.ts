import { TCreateUseCases, TUsecaseUpload } from '@/app/(app)/project/[projectId]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { ApiResponse } from '@/types/response';
import { GetAllUsecasesResponse } from '@/types/use-case';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useCaseQueryKey = ['use-case'];

export const createUseCase = async (data: TCreateUseCases): Promise<any> => {
  return customFetch.post<any>('/usecases', data);
};

export const getAllUsecases = async (projectId: string): Promise<GetAllUsecasesResponse> => {
  return customFetch.get<GetAllUsecasesResponse>(`/usecases?project_id=${projectId}`);
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
