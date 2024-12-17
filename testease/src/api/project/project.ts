import { customFetch } from '@/lib/api-client';
import {
  CreateProjectDTO,
  CreateProjectResponse,
  DeleteProjectResponse,
  GetProjectByIdResponse,
  GetProjectByUserResponse,
  UpdateProjectDTO,
  UpdateProjectResponse
} from '@/types/project.d';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const deleteProject = async (projectId: string): Promise<DeleteProjectResponse> => {
  return customFetch.delete<DeleteProjectResponse>(`/projects/${projectId}`);
};

export const updateProject = async (projectId: string, data: FormData): Promise<UpdateProjectResponse> => {
  return customFetch.patch<UpdateProjectResponse>(`/projects/${projectId}`, data);
};

export const createProject = async (data: FormData): Promise<CreateProjectResponse> => {
  return customFetch.post<CreateProjectResponse>('/projects', data);
};

export const getProjectsByUser = async (userId: string, searchParam?: string): Promise<GetProjectByUserResponse> => {
  const url = searchParam
    ? `/projects/user/${userId}?search=${encodeURIComponent(searchParam)}`
    : `/projects/user/${userId}`;
  //console.log(url);
  return customFetch.get<GetProjectByUserResponse>(url);
};

export const getProjectById = async (projectId: string): Promise<GetProjectByIdResponse> => {
  return customFetch.get<GetProjectByIdResponse>(`/projects/${projectId}`, {
    cache: 'force-cache',
    next: { revalidate: 60 }
  });
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
    mutationKey: ['delete-project'],
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
    mutationKey: ['update-project'],
    mutationFn: ({ projectId, data }: { projectId: string; data: FormData }) => updateProject(projectId, data),
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

export const useCreateProject = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-project'],
    mutationFn: ({ data }: { data: FormData }) => createProject(data),
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

export const useProject = (userId: string, searchParam?: string) => {
  return useQuery({
    queryKey: [...projectQueryKey, userId, searchParam],
    queryFn: () => getProjectsByUser(userId, searchParam),
    enabled: !!userId
  });
};
