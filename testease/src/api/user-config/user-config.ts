import { customFetch } from '@/lib/api-client';
import {
  GetUserConfigResponse,
  TestCaseExportColumn,
  UpdateTestCaseExportTemplateResponse,
  UserConfigOptionResponse
} from '@/types/user-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getUserConfig = async (): Promise<GetUserConfigResponse> => {
  return customFetch.get<GetUserConfigResponse>('/api/v1/user-config');
};

export const updateTestCaseExportTemplate = async (
  template: TestCaseExportColumn[]
): Promise<UpdateTestCaseExportTemplateResponse> => {
  return customFetch.put<UpdateTestCaseExportTemplateResponse>('/api/v1/user-config/test-case-template', { template });
};

export const addValueToUserConfig = async (field: {
  type: string;
  name: string;
}): Promise<UserConfigOptionResponse> => {
  console.log('field: ', field);
  return customFetch.post<UserConfigOptionResponse>('/api/v1/user-config/option', field);
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

export const useAddValueToUserConfig = ({
  onSuccess,
  onError
}: {
  onSuccess: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-value-to-user-config'],
    mutationFn: (field: { type: string; name: string }) => addValueToUserConfig(field),
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
