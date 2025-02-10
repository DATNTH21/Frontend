import { z } from 'zod';

export const TestCaseSchema = z.object({
  _id: z.string(),
  test_case_id: z.string(),
  use_case: z.string(),
  name: z.string(),
  objective: z.string(),
  pre_condition: z.string().optional(),
  steps: z.array(z.string()).optional(),
  expected_result: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  tester: z.string().optional(),
  test_date: z.string().optional(),
  remarks: z.string().optional()
});

export type TTestcase = z.infer<typeof TestCaseSchema>;

export type GetAllTestCasesOfScenarioResponse = {
  status: string;
  message: string;
  data: TTestcase[] | [];
};
