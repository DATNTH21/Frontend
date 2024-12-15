import { ApiResponse } from './response';
import { Usecase } from './usecase';

export type Project = {
  _id: string;
  project_id: string;
  name: string;
  description: string;
  status: 'Generating' | 'Done' | 'Seen';
  created_at?: Date;
  updated_at?: Date;
  use_cases?: Usecase[] | null;
  users: string[];
};

export type CreateProjectDTO = Pick<Project, 'name' | 'description' | 'users'>;
export type UpdateProjectDTO = Partial<Omit<Project, 'project_id'>>;
export type CreateProjectResponse = ApiResponse<Project>;
export type GetProjectByUserResponse = ApiResponse<Project[] | []>;
export type GetProjectByIdResponse = ApiResponse<Project>;
export type UpdateProjectResponse = ApiResponse<Project>;
export type DeleteProjectResponse = ApiResponse<undefined>;
export type AddUsecaseResponse = ApiResponse<undefined>;
