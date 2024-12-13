import { customFetch } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deleteProject = async (projectId: string): Promise<any> => {
  return customFetch.delete(`/projects/${projectId}`);
};

export const updateProject = async (projectId: string, data: Partial<any>): Promise<any> => {
  return customFetch.patch(`/projects/${projectId}`, data);
};

const projectQueryKey = ['project'];

export const useDeleteProject = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      // Revidate
      queryClient.invalidateQueries({ queryKey: projectQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};

export const useUpdateProject = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateProject'],
    mutationFn: ({ projectId, data }: { projectId: string; data: Partial<any> }) => updateProject(projectId, data),
    onSuccess: () => {
      // Revidate
      queryClient.invalidateQueries({ queryKey: projectQueryKey });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });
};
