import { z } from 'zod';
import { ApiResponse } from './response';

// Define the ConfigOption schema
export const TestCaseConfigOptionSchema = z.object({
  _id: z.string(),
  name: z.string(),
  icon: z.string().default('CircleDot')
});

// Define the TestCaseExportColumn schema
const TestCaseExportColumnSchema = z.object({
  fieldKey: z.enum([
    'test_case_id',
    'use_case',
    'name',
    'objective',
    'pre_condition',
    'steps',
    'expected_result',
    'priority',
    'status',
    'test_date',
    'tester',
    'remarks'
  ]),
  displayName: z.string(),
  order: z.number(),
  visible: z.boolean()
});

export type ExampleTestCaseData = {
  status: string;
  test_case_id: string;
  use_case: string;
  name: string;
  objective: string;
  pre_condition: string;
  steps: string[];
  expected_result: string;
  priority: string;
  test_date: string;
  tester: string;
  remarks: string;
};

// Define the UserConfig schema
export const UserConfigSchema = z.object({
  userId: z.string(), // Assuming userId is a string (ObjectId in Mongoose)
  priority: z.array(TestCaseConfigOptionSchema),
  status: z.array(TestCaseConfigOptionSchema),
  testCaseExportTemplate: z.array(TestCaseExportColumnSchema)
});

export type UserConfig = z.infer<typeof UserConfigSchema>;
export type TestCaseConfigOption = z.infer<typeof TestCaseConfigOptionSchema>;
export type UserConfigOptionResponse = ApiResponse<TestCaseConfigOption[]>;
export type GetUserConfigResponse = ApiResponse<UserConfig>;
export type TestCaseExportColumn = z.infer<typeof TestCaseExportColumnSchema>;
export type UpdateTestCaseExportTemplateResponse = ApiResponse<TestCaseExportColumn[]>;
