import { create } from 'zustand';

type State = {
  open: boolean;
  title: string;
  mainText: string;
  cancelText: string;
  confirmText: string;
};

type Action = {
  updateDialogOpen: (open: State['open']) => void;
  updateDialogState: ({
    cancelText,
    confirmText,
    mainText,
    open,
    title,
  }: {
    cancelText?: string;
    confirmText?: string;
    mainText?: string;
    open?: boolean;
    title?: string;
  }) => void;
};

export const dialogDefaultState = {
  open: false,
  title: '알림',
  mainText: '',
  cancelText: '취소',
  confirmText: '확인',
};

export const useDialogStore = create<State & Action>((set) => ({
  ...dialogDefaultState,
  updateDialogOpen: (open) => set(() => ({ open: !open })),
  updateDialogState: (props) =>
    set((prev) => ({
      ...prev,
      ...props,
    })),
}));
