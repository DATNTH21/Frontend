import { z } from 'zod';

export const TestCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.enum(['low', 'medium', 'high'])
});

export type TTestcase = z.infer<typeof TestCaseSchema>;
