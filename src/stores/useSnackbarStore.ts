import { SnackbarOrigin } from '@mui/material';

import { create } from 'zustand';

interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
}

type Action = {
  updateSnackbarState: ({ horizontal, message, vertical, open }: Partial<State>) => void;
  reset: () => void;
};

export const snackbarDefaultState: State = {
  open: false,
  vertical: 'top',
  horizontal: 'center',
  message: '',
};

export const useSnackbarStore = create<State & Action>()((set) => ({
  ...snackbarDefaultState,
  updateSnackbarState: (props) => set(() => ({ ...snackbarDefaultState, ...props })),
  reset: () => set(() => ({ ...snackbarDefaultState })),
}));
