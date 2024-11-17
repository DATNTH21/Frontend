import { z } from 'zod';

export const testCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.string()
});

export type Testcase = z.infer<typeof testCaseSchema>;
