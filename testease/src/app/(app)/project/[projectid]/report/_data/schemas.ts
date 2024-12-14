import { z } from "zod";

export const BugReportSchema = z.object({
  project: z.string(),
  bugId: z.string(),
  reportedBy: z.string(),
  assignTo: z.string().optional(),
  status: z.enum(["open", "in-progress", "closed"]),
  functionName: z.string(),
  problemSummary: z.string(),
  stepsToReproduce: z.string(),
});

export type TBugReportSchema = z.infer<typeof BugReportSchema>;

export const CreateBugReportSchema = z.object({
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
});

export type TCreateBugReportSchema = z.infer<typeof CreateBugReportSchema>;

export const EditBugReportSchema = z.object({
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
});

export type TEditBugReportSchema = z.infer<typeof EditBugReportSchema>;
