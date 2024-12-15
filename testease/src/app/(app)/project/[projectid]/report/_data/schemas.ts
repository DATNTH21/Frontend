import { z } from "zod";

export const BugReportSchema = z.object({
  title: z.string(),
  project: z.string(),
  bugId: z.string(),
  reportedBy: z.string(),
  assignTo: z.string().optional(),
  status: z.enum(["open", "in-progress", "closed"]),
  functionName: z.string(),
  problemSummary: z.string(),
  stepsToReproduce: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  priority: z.enum(["low", "medium", "high"]),
});

export type TBugReportSchema = z.infer<typeof BugReportSchema>;

export const CreateBugReportSchema = z.object({
  title: z.string().min(1, "Title is required"),
  project: z.string().min(1, "Project is required"),
  bugId: z.string().optional(),
  reportedBy: z.string().min(1, "Reported by is required"),
  assignTo: z.string().optional(),
  status: z
    .enum(["open", "in-progress", "closed"], {
      errorMap: () => ({ message: "Invalid status value" }),
    })
    .default("open"),
  functionName: z.string().min(1, "Function name is required"),
  problemSummary: z.string().min(1, "Problem summary is required"),
  stepsToReproduce: z.string().min(1, "Steps to reproduce are required"),
  severity: z
    .enum(["low", "medium", "high"], {
      errorMap: () => ({ message: "Invalid severity value" }),
    })
    .default("medium"),
  priority: z
    .enum(["low", "medium", "high"], {
      errorMap: () => ({ message: "Invalid priority value" }),
    })
    .default("medium"),
});

export type TCreateBugReportSchema = z.infer<typeof CreateBugReportSchema>;

export const EditBugReportSchema = z.object({
  title: z.string().optional(),
  project: z.string().optional(),
  bugId: z.string().optional(),
  reportedBy: z.string().optional(),
  assignTo: z.string().optional(),
  status: z
    .enum(["open", "in-progress", "closed"], {
      errorMap: () => ({ message: "Invalid status value" }),
    })
    .optional(),
  functionName: z.string().optional(),
  problemSummary: z.string().optional(),
  stepsToReproduce: z.string().optional(),
  severity: z
    .enum(["low", "medium", "high"], {
      errorMap: () => ({ message: "Invalid severity value" }),
    })
    .optional(),
  priority: z
    .enum(["low", "medium", "high"], {
      errorMap: () => ({ message: "Invalid priority value" }),
    })
    .optional(),
});

export type TEditBugReportSchema = z.infer<typeof EditBugReportSchema>;

export const TestReportSchema = z.object({
  title: z.string(),
  project: z.string(),
  functionName: z.string(),
  testSummary: z.string(),
  testResults: z.string()
});

export type TTestReportSchema = z.infer<typeof TestReportSchema>;

export const CreateTestReportSchema = z.object({
  title: z.string().min(1, "Title is required"),
  project: z.string().min(1, "Project is required"),
  functionName: z.string().min(1, "Function name is required"),
  testSummary: z.string().min(1, "Test summary is required"),
  testResults: z.string().min(1, "Test results are required")
});

export type TCreateTestReportSchema = z.infer<typeof CreateTestReportSchema>;

export const EditTestReportSchema = z.object({
  title: z.string().optional(),
  project: z.string().optional(),
  functionName: z.string().optional(),
  testSummary: z.string().optional(),
  testResults: z.string().optional(),
});

export type TEditTestReportSchema = z.infer<typeof EditTestReportSchema>;

const ReportTypeEnum = z.enum(["Bug Report", "Test Report"]);

export const ReportSchema = z.object({
  _id: z.string(),
  title: z.string(),
  type: ReportTypeEnum,
  project: z.string(),
  reportedBy: z.string(),
  functionName: z.string(),
  // Bug-specific fields
  bugId: z.string().optional(),
  assignTo: z.string().optional(),
  status: z.enum(["open", "in-progress", "closed"]).optional(),
  problemSummary: z.string().optional(),
  stepsToReproduce: z.string().optional(),
  severity: z.enum(["low", "medium", "high"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  // Test-specific fields
  testSummary: z.string().optional(),
  testResults: z.string().optional(),
});

export type TReportSchema = z.infer<typeof ReportSchema>;