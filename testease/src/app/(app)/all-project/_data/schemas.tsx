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

export const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional()
});

export const EditProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional()
});

export type TEditProjectSchema = z.infer<typeof EditProjectSchema>;
export type TCreateProjectSchema = z.infer<typeof CreateProjectSchema>;
