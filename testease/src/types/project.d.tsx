import { z } from 'zod';
import { ApiResponse } from './response';
import { Usecase, UsecaseSchema } from './usecase.d';

export const ProjectSchema = z.object({
  _id: z.string(),
  project_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['Generating', 'Done', 'Seen', 'Failed', 'Default']),
  created_at: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  updated_at: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  use_cases: z.array(UsecaseSchema).nullable().optional(),
  users: z.array(z.string())
});

export type Project = {
  _id: string;
  project_id: string;
  name: string;
  description?: string;
  status: 'Generating' | 'Done' | 'Seen' | 'Failed' | 'Default';
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
