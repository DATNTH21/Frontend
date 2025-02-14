import { TCreateTestcases } from '@/app/(app)/project/[projectId]/blackbox-test/_data/schema';
import { customFetch } from '@/lib/api-client';
import { DeleteTestCaseResponse, GetTestCasesResponse, UpdateTestCaseResponse } from '@/types/test-case';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const testCaseQueryKey = ['testcase'];

export const getAllTestCasesOfProject = async (projectId: string): Promise<GetTestCasesResponse> => {
  return customFetch.get<GetTestCasesResponse>(`/api/v1/testcases?project_id=${projectId}`);
};
export const getAllTestCasesOfUseCase = async (useCaseId: string): Promise<GetTestCasesResponse> => {
  return customFetch.get<GetTestCasesResponse>(`/api/v1/testcases?use_case_id=${useCaseId}`);
};
export const getAllTestCasesOfScenario = async (scenarioId: string): Promise<GetTestCasesResponse> => {
  return customFetch.get<GetTestCasesResponse>(`/api/v1/testcases?scenario_id=${scenarioId}`);
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

export const useTestCasesOfProject = (projectId: string) => {
  return useQuery({
    queryKey: [...testCaseQueryKey, projectId],
    queryFn: () => getAllTestCasesOfProject(projectId)
  });
};

export const useTestCasesOfUseCase = (useCaseId: string) => {
  return useQuery({
    queryKey: [...testCaseQueryKey, useCaseId],
    queryFn: () => getAllTestCasesOfUseCase(useCaseId)
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
