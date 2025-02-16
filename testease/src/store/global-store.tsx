import { create } from 'zustand';
import { TTestcase } from '@/types/test-case';

type Feature = { name: string; slug: string };

type GlobalStoreProps = {
  isEditTestCaseOpen: boolean;
  editTestCase: TTestcase | undefined;
  openEditTestCaseDialog: (testCase: TTestcase) => void;
  closeEditTestCaseDialog: () => void;

  // Doc feature
  features: Feature[];
  selectedFeature: Feature;
  setFeature: (feature: Feature) => void;
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  isEditTestCaseOpen: false,
  editTestCase: undefined,
  openEditTestCaseDialog: (testCase) => set({ isEditTestCaseOpen: true, editTestCase: testCase }),
  closeEditTestCaseDialog: () => {
    set({ isEditTestCaseOpen: false, editTestCase: undefined });
  },

  // Available features
  features: [
    { name: 'Testease Core', slug: 'testease-core' },
    { name: 'WeTest Extension', slug: 'wetest-extension' }
  ],

  // Default feature object
  selectedFeature: { name: 'Testease Core', slug: 'testease-core' },

  // Update feature as an object, not a string
  setFeature: (feature) => set({ selectedFeature: feature })
}));
