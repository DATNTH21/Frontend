import { z } from 'zod';
import { ApiResponse } from './response';

export const ScenarioSchema = z.object({
  _id: z.string(),
  scenario_id: z.string(),
  content: z.string()
});

export type TScenario = z.infer<typeof ScenarioSchema>;

export type GetAllScenariosOfUCResponse = {
  status: string;
  message: string;
  data: TScenario[] | [];
};

export type DeleteScenarioResponse = ApiResponse<undefined>;
