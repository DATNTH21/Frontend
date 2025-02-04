import { z } from 'zod';

export type UseCase = {
  use_case_id: string;
  project_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export const UseCaseSchema = z.object({
  use_case_id: z.string(),
  project_id: z.string(),
  content: z.string(),
  created_at: z.string().transform((val) => new Date(val)),
  updated_at: z.string().transform((val) => new Date(val))
});
