import { create } from 'zustand';

type GlobalStoreProps = {
  isEditTestCaseOpen: boolean;
  editTestCaseId: string | undefined;
  openEditTestCaseDialog: (id: string) => void;
  closeEditTestCaseDialog: () => void;
};

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  isEditTestCaseOpen: false,
  editTestCaseId: undefined,
  openEditTestCaseDialog: (id) => set({ isEditTestCaseOpen: true, editTestCaseId: id }),
  closeEditTestCaseDialog: () => {
    set({ isEditTestCaseOpen: false, editTestCaseId: undefined });
  }
}));
