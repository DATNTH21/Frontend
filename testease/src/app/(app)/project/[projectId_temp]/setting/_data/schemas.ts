import { z } from 'zod';

export const CreateFieldSchema = z.object({
  field: z.string().min(1, 'Field name is required'),
  values: z.array(z.string()).refine((values) => !values || values.length > 0, {
    message: 'Values cannot be an empty array'
  })
});

export const AddValueSchema = z.object({
  value: z.string().min(1, 'Value is required')
});

export type TAddValueSchema = z.infer<typeof AddValueSchema>;
export type TCreateFieldSchema = z.infer<typeof CreateFieldSchema>;
