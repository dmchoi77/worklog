import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  open: boolean;
  title: string;
  mainText: string;
  cancelText: string;
  confirmText: string;
};

type Action = {
  updateDialogState: ({ cancelText, confirmText, mainText, open, title }: Partial<State>) => void;
};

export const dialogDefaultState = {
  open: false,
  title: '알림',
  mainText: '',
  cancelText: '취소',
  confirmText: '확인',
};

export const useDialogStore = create<State & Action>()(
  devtools((set) => ({
    ...dialogDefaultState,
    updateDialogState: (props) => set(() => ({ ...dialogDefaultState, ...props })),
  })),
);
