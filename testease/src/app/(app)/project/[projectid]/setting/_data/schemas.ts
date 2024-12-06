import { z } from 'zod';

export const fieldSchema = z.object({
  _id: z.string(),
  field: z.string(),
  values: z.array(z.string()),
  project: z.string(),
  type: z.string()
});

export type TFieldSchema = z.infer<typeof fieldSchema>;

export const CreateFieldSchema = z.object({
  field: z.string().min(1, 'Field name is required'),
  values: z
    .array(z.string())
    .refine((values) => !values || values.length > 0, {
      message: 'Values cannot be an empty array',
    }),
  project: z.string().min(1, 'Project ID is required'),
  type: z.string().optional(),
});

export const EditFieldSchema = z.object({
  field: z.string().min(1, 'Field name is required'),
  values: z
    .array(z.string())
    .optional()
    .refine((values) => !values || values.length > 0, {
      message: 'Values cannot be an empty array',
    }),
  project: z.string().min(1, 'Project ID is required'),
  type: z.string().optional(),
});

export type TEditFieldSchema = z.infer<typeof EditFieldSchema>;
export type TCreateFieldSchema = z.infer<typeof CreateFieldSchema>;
