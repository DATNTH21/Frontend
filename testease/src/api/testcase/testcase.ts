import { TCreateTestcases } from '@/app/(app)/project/[projectId]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { GetAllTestCasesOfScenarioResponse } from '@/types/test-case';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const testCaseQueryKey = ['testcase'];

export const getAllTestCasesOfScenario = async (scenarioId: string): Promise<GetAllTestCasesOfScenarioResponse> => {
  return customFetch.get<GetAllTestCasesOfScenarioResponse>(`/api/v1/testcases?scenario_id=${scenarioId}`);
};

export const createTestCases = async (data: TCreateTestcases): Promise<any> => {
  return customFetch.post<any>('/api/v1/testcases', data);
};

export const useCreateTestcases = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-test-cases'],
    mutationFn: ({ data }: { data: TCreateTestcases }) => createTestCases(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testCaseQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useTestCasesOfScenario = (scenarioId: string) => {
  return useQuery({
    queryKey: [...testCaseQueryKey, scenarioId],
    queryFn: () => getAllTestCasesOfScenario(scenarioId)
  });
};
