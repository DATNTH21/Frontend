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

export const TestCaseFormSchema = z.object({
  _id: z.string(),
  test_case_id: z.string(),
  name: z.string(),
  objective: z.string(),
  steps: z.array(
    z.object({
      id: z.string(),
      value: z.string().min(1, 'Step cannot be empty')
    })
  ),
  expected_result: z.string(),
  status: z.string(),
  priority: z.enum(['Low', 'Medium', 'High']).default('Medium')
});

export type TTestcaseForm = z.infer<typeof TestCaseFormSchema>;

export type GetAllTestCasesOfScenarioResponse = {
  status: string;
  message: string;
  data: TTestcase[] | [];
};

export type DeleteTestCaseResponse = ApiResponse<undefined>;
export type UpdateTestCaseResponse = ApiResponse<TTestcase>;
