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
