import { z } from 'zod';

export const TestCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.enum(['low', 'medium', 'high'])
});

const checkFileType = (file: File) => {
  const supportedTypes = ['application/msword', 'application/pdf', 'text/plain', 'text/markdown'];
  return supportedTypes.includes(file.type);
};

export const UsecaseUploadSchema = z.object({
  description: z
    .custom<File>((file) => file instanceof File, 'File is required')
    .refine((file) => checkFileType(file), {
      message: 'Only .txt, .doc, .pdf and .md are supported'
    })
});

export type TUsecaseUpload = z.infer<typeof UsecaseUploadSchema>;

export type Testcase = z.infer<typeof TestCaseSchema>;
