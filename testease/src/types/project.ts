import { z } from 'zod';
import { ApiResponse } from './response';
import { UseCase, UseCaseSchema } from './use-case';
import { TTestcase } from './test-case';

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
  use_cases: z.array(UseCaseSchema).nullable().optional(),
  user: z.string()
});

export type Project = {
  _id: string;
  project_id: string;
  name: string;
  description?: string;
  status: 'Generating' | 'Done' | 'Seen' | 'Failed' | 'Default';
  created_at?: Date;
  updated_at?: Date;
  use_cases?: UseCase[] | null;
  user: string;
  test_cases?: TTestcase[] | [];
};

export type CreateProjectDTO = Pick<Project, 'name' | 'description'>;
export type UpdateProjectDTO = Partial<Omit<Project, 'project_id'>>;
export type CreateProjectResponse = ApiResponse<Project>;
export type GetProjectByUserResponse = {
  status: string;
  message: string;
  data: Project[] | [];
};
export type GetProjectByIdResponse = ApiResponse<Project>;
export type UpdateProjectResponse = ApiResponse<Project>;
export type DeleteProjectResponse = ApiResponse<undefined>;
export type AddUsecaseResponse = ApiResponse<undefined>;
