import { TCreateScenarios } from '@/app/(app)/project/[projectId]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { DeleteScenarioResponse, GetAllScenariosOfUCResponse } from '@/types/scenario';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const scenarioQueryKey = ['scenario'];

export const getAllScenariosOfUC = async (usecaseId: string): Promise<GetAllScenariosOfUCResponse> => {
  return customFetch.get<GetAllScenariosOfUCResponse>(`/api/v1/scenarios?usecase_id=${usecaseId}`);
};

export const createScenarios = async (data: TCreateScenarios): Promise<any> => {
  return customFetch.post<any>('/api/v1/scenarios', data);
};

export const deleteScenario = async (scenarioId: string): Promise<DeleteScenarioResponse> => {
  return customFetch.delete<DeleteScenarioResponse>(`/api/v1/scenarios/${scenarioId}`);
};

export const useScenariosOfUC = (usecaseId: string) => {
  return useQuery({
    queryKey: [...scenarioQueryKey, usecaseId],
    queryFn: () => getAllScenariosOfUC(usecaseId)
  });
};

export const useCreateScenarios = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-scenarios'],
    mutationFn: ({ data }: { data: TCreateScenarios }) => createScenarios(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scenarioQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useDeleteScenario = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-scenario'],
    mutationFn: (projectId: string) => deleteScenario(projectId),
    onSuccess: () => {
      // Revidate
      queryClient.invalidateQueries({ queryKey: scenarioQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};
