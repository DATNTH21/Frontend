import { TTestcase } from '@/types/test-case';
import { create } from 'zustand';

type GlobalStoreProps = {
  isEditTestCaseOpen: boolean;
  editTestCase: TTestcase | undefined;
  openEditTestCaseDialog: (testCase: TTestcase) => void;
  closeEditTestCaseDialog: () => void;

  // doc feature
  features: ['Blackbox Test', 'Unit Test', 'API Test'];
  selectedFeature: string;
  setFeature: (feature: string) => void;
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  isEditTestCaseOpen: false,
  editTestCase: undefined,
  openEditTestCaseDialog: (testCase) => set({ isEditTestCaseOpen: true, editTestCase: testCase }),
  closeEditTestCaseDialog: () => {
    set({ isEditTestCaseOpen: false, editTestCase: undefined });
  },

  features: ['Blackbox Test', 'Unit Test', 'API Test'],
  selectedFeature: 'Blackbox Test',
  setFeature: (feature) => set({ selectedFeature: feature })
}));
