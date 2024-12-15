import { z } from 'zod';

export type Usecase = {
  use_case_id: string;
  project_id: string;
  file: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export const UsecaseSchema = z.object({
  use_case_id: z.string(),
  project_id: z.string(),
  file: z.string(),
  description: z.string(),
  created_at: z.string().transform((val) => new Date(val)),
  updated_at: z.string().transform((val) => new Date(val))
});
