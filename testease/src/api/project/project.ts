import { customFetch } from "@/lib/api-client";
import { CreateNewProjectResponse, GetProjectsResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const createNewProject = async (
  name: string,
  description: string,
  users: string
): Promise<CreateNewProjectResponse> => {
  const response = customFetch.post<CreateNewProjectResponse>(
    "/projects",
    { name, description, users }
  );
  return response;
};

export const getProjects = async (
  userId: string
): Promise<GetProjectsResponse> => {
  const response = customFetch.get<GetProjectsResponse>(
    `/projects/user/${userId}`,
    { cache: "force-cache" }
  );
  return response;
};

export const useProjects = (
  userId: string
) => {
  return useQuery({
    queryKey: ["getProjects"],
    queryFn: () => getProjects(userId),
  });
};