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
    set((state) => {
      const newState = {
        scenarioSelection: {
          ...state.scenarioSelection,
          [useCaseId]: typeof selection === 'function' ? selection(state.scenarioSelection[useCaseId] || {}) : selection
        }
      };
      if (Object.keys(newState.scenarioSelection[useCaseId]).length === 0) {
        delete newState.scenarioSelection[useCaseId];
      }
      return newState;
    })
}));
