import { z } from 'zod';

export const testCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.enum(['low', 'medium', 'high'])
});

export type Testcase = z.infer<typeof testCaseSchema>;
