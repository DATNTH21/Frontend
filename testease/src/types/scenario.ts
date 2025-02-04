import { z } from 'zod';

export const ScenarioSchema = z.object({
  _id: z.string(),
  content: z.string()
});

export type TScenario = z.infer<typeof ScenarioSchema>;
