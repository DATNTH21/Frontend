import { z } from 'zod';

export const projectStatus = [
  {
    label: 'Generating',
    value: 'Generating',
    color: 'hsl(var(--primary))'
  },
  {
    label: 'Done',
    value: 'Done',
    color: '#37b24d'
  },
  {
    label: 'Failed',
    value: 'Failed',
    color: '#f03e3e'
  },
  {
    label: 'Seen',
    value: 'Seen',
    color: '#1E90FF'
  }
];
export const projectSchema = z.object({
  _id: z.string(),
  title: z.string(),
  link: z.string(),
  description: z.instanceof(File).nullable().optional(),
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
