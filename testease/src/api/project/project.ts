import { TCreateProjectSchema } from '@/app/(app)/all-project/_data/schemas';
import { customFetch } from '@/lib/api-client';
import {
  CreateProjectResponse,
  DeleteProjectResponse,
  GetProjectByIdResponse,
  GetProjectByUserResponse,
  GetProjectOverviewStatistics,
  UpdateProjectResponse
} from '@/types/project';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const deleteProject = async (projectId: string): Promise<DeleteProjectResponse> => {
  return customFetch.delete<DeleteProjectResponse>(`/api/v1/projects/${projectId}`);
};

export const updateProject = async (projectId: string, data: FormData): Promise<UpdateProjectResponse> => {
  return customFetch.patch<UpdateProjectResponse>(`/api/v1/projects/${projectId}`, data);
};

export const createProject = async (data: TCreateProjectSchema): Promise<CreateProjectResponse> => {
  return customFetch.post<CreateProjectResponse>('/api/v1/projects', data);
};

export const getProjectsByUser = async (searchParam?: string): Promise<GetProjectByUserResponse> => {
  const url = searchParam ? `/api/v1/projects?search=${encodeURIComponent(searchParam)}` : `/api/v1/projects`;
  //console.log(url);
  return customFetch.get<GetProjectByUserResponse>(url);
};

export const getProjectById = async (projectId: string): Promise<GetProjectByIdResponse> => {
  return customFetch.get<GetProjectByIdResponse>(`/api/v1/projects/${projectId}`);
};

export const getProjectStatistics = async (projectId: string): Promise<GetProjectOverviewStatistics> => {
  return customFetch.get<GetProjectOverviewStatistics>(`/api/v1/projects/${projectId}/statistics`, {
    next: { revalidate: 1000 * 60 * 5 }
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
    mutationFn: ({ data }: { data: TCreateProjectSchema }) => createProject(data),
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

export const useProjects = (searchParam?: string) => {
  return useQuery({
    queryKey: [...projectQueryKey, searchParam],
    queryFn: () => getProjectsByUser(searchParam)
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: [...projectQueryKey, id],
    queryFn: () => getProjectById(id)
    // staleTime: 0
  });
};
