import { z } from 'zod';

const checkFileType = (file: File) => {
  const supportedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'text/plain',
    'text/markdown'
  ];
  return supportedTypes.includes(file.type);
};

export const UseCaseUploadSchema = z.object({
  description: z
    .custom<File>((file) => file instanceof File, 'File is required')
    .refine((file) => checkFileType(file), {
      message: 'Only .txt, .docx, .pdf and .md are supported'
    })
});

export type TUsecaseUpload = z.infer<typeof UseCaseUploadSchema>;

export const CreateUseCasesSchema = z.object({
  project_id: z.string(),
  content: z.array(z.string())
});

export type TCreateUseCases = z.infer<typeof CreateUseCasesSchema>;

export type TCreateScenarios = {
  use_case_ids: string[];
};

export type TCreateTestcases = {
  use_case_id: string;
  scenario_ids: string[];
}[];
