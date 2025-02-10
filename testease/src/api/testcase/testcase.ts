import { TCreateTestcases } from '@/app/(app)/project/[projectId]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { DeleteTestCaseResponse, GetAllTestCasesOfScenarioResponse } from '@/types/test-case';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const testCaseQueryKey = ['testcase'];

export const getAllTestCasesOfScenario = async (scenarioId: string): Promise<GetAllTestCasesOfScenarioResponse> => {
  return customFetch.get<GetAllTestCasesOfScenarioResponse>(`/api/v1/testcases?scenario_id=${scenarioId}`);
};

export const createTestCases = async (data: TCreateTestcases): Promise<any> => {
  return customFetch.post<any>('/api/v1/testcases', data);
};

export const deleteTestCase = async (testcaseId: string): Promise<DeleteTestCaseResponse> => {
  return customFetch.delete<DeleteTestCaseResponse>(`/api/v1/testcases/${testcaseId}`);
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

export const useDeleteTestCase = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-test-case'],
    mutationFn: (projectId: string) => deleteTestCase(projectId),
    onSuccess: () => {
      // Revidate
      queryClient.invalidateQueries({ queryKey: testCaseQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('error', error);
      onError?.(error);
    }
  });
};
