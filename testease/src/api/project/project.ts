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

export const updateProject = async (projectId: string, data: UpdateProjectDTO): Promise<UpdateProjectResponse> => {
  return customFetch.patch<UpdateProjectResponse>(`/projects/${projectId}`, data);
};

export const createProject = async (data: CreateProjectDTO): Promise<CreateProjectResponse> => {
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
    mutationFn: ({ projectId, data }: { projectId: string; data: UpdateProjectDTO }) => updateProject(projectId, data),
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
    mutationKey: ['updateProject'],
    mutationFn: ({ projectId, data }: { projectId: string; data: CreateProjectDTO }) => updateProject(projectId, data),
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

export const useProject = (userId: string) => {
  return useQuery({
    queryKey: ['user-project', userId],
    queryFn: () => getProjectsByUser(userId)
  });
};
