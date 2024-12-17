import { z } from 'zod';

export const projectStatus = [
  {
    label: 'GENERATING',
    value: 'Generating',
    color: 'hsl(var(--primary))'
  },
  {
    label: 'DONE',
    value: 'Done',
    color: '#37b24d'
  },
  {
    label: 'FAILED',
    value: 'Failed',
    color: '#f03e3e'
  },
  {
    label: 'SEEN',
    value: 'Seen',
    color: '#1E90FF'
  },
  {
    label: 'DEFAULT',
    value: 'Default',
    color: ''
  }
];

const checkFileType = (file: File) => {
  const supportedTypes = ['application/msword', 'application/pdf', 'text/plain'];
  return supportedTypes.includes(file.type);
};

export const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z
    .any()
    .nullable()
    .optional()
    .refine((file) => file === null || file === undefined || checkFileType(file), {
      message: 'Only .txt, .doc and .pdf is supported'
    })
});

export const EditProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z
    .any()
    .nullable()
    .optional()
    .refine((file) => file === null || file === undefined || checkFileType(file), {
      message: 'Only .txt, .doc, and .pdf are supported'
    })
});

export type TEditProjectSchema = z.infer<typeof EditProjectSchema>;
export type TCreateProjectSchema = z.infer<typeof CreateProjectSchema>;
