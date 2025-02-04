import { RowSelectionState } from '@tanstack/react-table';
import { create } from 'zustand';

type ScenarioStoreState = {
  scenarioSelection: Record<string, RowSelectionState>;
  setScenarioSelection: (
    useCaseId: string,
    selection: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)
  ) => void;
};
export const useScenarioStore = create<ScenarioStoreState>((set) => ({
  scenarioSelection: {},
  setScenarioSelection: (useCaseId, selection) =>
    set((state) => ({
      scenarioSelection: {
        ...state.scenarioSelection,
        [useCaseId]: typeof selection === 'function' ? selection(state.scenarioSelection[useCaseId] || {}) : selection
      }
    }))
}));
