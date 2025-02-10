import { z } from 'zod';
import { ApiResponse } from './response';

export const TestCaseSchema = z.object({
  _id: z.string(),
  test_case_id: z.string(),
  name: z.string(),
  objective: z.string(),
  steps: z.array(z.string()),
  expected_result: z.string(),
  status: z.string(),
  priority: z.enum(['Low', 'Medium', 'High']).default('Medium')
});

export type TTestcase = z.infer<typeof TestCaseSchema>;

export type GetAllTestCasesOfScenarioResponse = {
  status: string;
  message: string;
  data: TTestcase[] | [];
};

export type DeleteTestCaseResponse = ApiResponse<undefined>;
