import { TTestcase } from '@/types/test-case';
import { create } from 'zustand';

type GlobalStoreProps = {
  isEditTestCaseOpen: boolean;
  editTestCase: TTestcase | undefined;
  openEditTestCaseDialog: (testCase: TTestcase) => void;
  closeEditTestCaseDialog: () => void;
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  isEditTestCaseOpen: false,
  editTestCase: undefined,
  openEditTestCaseDialog: (testCase) => set({ isEditTestCaseOpen: true, editTestCase: testCase }),
  closeEditTestCaseDialog: () => {
    set({ isEditTestCaseOpen: false, editTestCase: undefined });
  }
}));
