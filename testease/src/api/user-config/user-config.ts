import { customFetch } from '@/lib/api-client';
import { GetUserConfigResponse, TestCaseExportColumn, UpdateTestCaseExportTemplateResponse } from '@/types/user-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getUserConfig = async (): Promise<GetUserConfigResponse> => {
  return customFetch.get<GetUserConfigResponse>('/api/v1/user-config');
};

export const updateTestCaseExportTemplate = async (
  template: TestCaseExportColumn[]
): Promise<UpdateTestCaseExportTemplateResponse> => {
  return customFetch.put<UpdateTestCaseExportTemplateResponse>('/api/v1/user-config/test-case-template', { template });
};

const userConfigQueryKey = ['user-config'];

export const useUserConfig = () => {
  return useQuery({
    queryKey: userConfigQueryKey,
    queryFn: () => getUserConfig()
  });
};

export const useUpdateTestCaseExportTemplate = ({
  onSuccess,
  onError
}: {
  onSuccess: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-test-case-export-template'],
    mutationFn: (template: TestCaseExportColumn[]) => updateTestCaseExportTemplate(template),
    onSuccess: () => {
      // Revidate
      queryClient.invalidateQueries({ queryKey: userConfigQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};
