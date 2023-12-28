import { create } from 'zustand';

interface State {
  username: string;
}

type Action = {
  updateUserInfoState: (username: string) => void;
  reset: () => void;
};

export const userInfoDefaultState: State = {
  username: '',
};

export const useUserInfoState = create<State & Action>()((set) => ({
  ...userInfoDefaultState,
  updateUserInfoState: (value) => set(() => ({ username: value })),
  reset: () => set(() => ({ ...userInfoDefaultState })),
}));
