import { z } from 'zod';

export const projectStatus = [
  {
    label: 'generating',
    value: 'GENERATING',
    color: 'hsl(var(--primary))'
  },
  {
    label: 'complete',
    value: 'COMPLETE',
    color: '#37b24d'
  },
  {
    label: 'default',
    value: 'Default',
    color: '#7c3aed'
  },
  {
    label: 'failed',
    value: 'FAILED',
    color: '#f03e3e'
  },
  {
    label: 'seen',
    value: 'SEEN',
    color: '#1E90FF'
  }
];
export const projectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string()
});

export type TProjectSchema = z.infer<typeof projectSchema>;

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
