import { z } from 'zod';

export const fieldSchema = z.object({
  field: z.string(),
  values: z.array(z.string())
});

export type TFieldSchema = z.infer<typeof fieldSchema>;

export const CreateFieldSchema = z.object({
  field: z.string().min(1, 'Field name is required'),
  values: z.array(z.string()).refine((values) => !values || values.length > 0, {
    message: 'Values cannot be an empty array'
  })
});

export const EditFieldSchema = z.object({
  field: z.string().min(1, 'Field name is required'),
  values: z
    .array(z.string())
    .optional()
    .refine((values) => !values || values.length > 0, {
      message: 'Values cannot be an empty array'
    })
});

export type TEditFieldSchema = z.infer<typeof EditFieldSchema>;
export type TCreateFieldSchema = z.infer<typeof CreateFieldSchema>;
