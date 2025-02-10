import { TCreateTestcases } from '@/app/(app)/project/[projectId]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { DeleteTestCaseResponse, GetAllTestCasesOfScenarioResponse, UpdateTestCaseResponse } from '@/types/test-case';
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

export const updateTestCase = async (id: string, data: Object): Promise<UpdateTestCaseResponse> => {
  return customFetch.patch<UpdateTestCaseResponse>(`/api/v1/testcases/${id}`, data);
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

export const useUpdateTestCase = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-test-case'],
    mutationFn: ({ id, data }: { id: string; data: Object }) => updateTestCase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testCaseQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};
