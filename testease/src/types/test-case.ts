import { z } from 'zod';
import { ApiResponse } from './response';

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
  priority: z.string(),
  tester: z.string(),
  test_date: z.string(),
  remarks: z.string()
});

export type TTestcaseForm = z.infer<typeof TestCaseFormSchema>;

export type GetAllTestCasesOfScenarioResponse = {
  status: string;
  message: string;
  data: TTestcase[] | [];
};

export type DeleteTestCaseResponse = ApiResponse<undefined>;
export type UpdateTestCaseResponse = ApiResponse<TTestcase>;
