import { ReactNode } from 'react';
import { create } from 'zustand';

interface AlertDialogState {
  dialogStack: Array<ReactNode>;
}

interface AlertDialogAction {
  openDialog: (item: ReactNode) => void;
  closeDialog: () => void;
}

export const alertDialogDefaultState: AlertDialogState = {
  dialogStack: [],
};

export const useAlertDialogStore = create<AlertDialogState & AlertDialogAction>()((set, get) => ({
  ...alertDialogDefaultState,
  openDialog: (item) => set({ dialogStack: [...get().dialogStack, item] }),
  closeDialog: () => set({ dialogStack: [...get().dialogStack].slice(0, -1) }),
}));
