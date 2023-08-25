import { atom } from 'recoil';

export type DialogState = {
  open: boolean;
  title: string;
  mainText: string;
  handleClose: () => void;
  handleConfirm: () => void;
  cancelText: string;
  confirmText: string;
};

export const dialogDefaultState: DialogState = {
  open: false,
  title: '알림',
  mainText: '',
  handleClose: () => {},
  handleConfirm: () => {},
  cancelText: '취소',
  confirmText: '확인',
};

export const dialogState = atom<DialogState>({
  key: 'dialogState',
  default: dialogDefaultState,
});
