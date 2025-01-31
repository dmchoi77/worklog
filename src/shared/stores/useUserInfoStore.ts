import { create } from 'zustand';

export const userInfoDefaultStore: Omit<UserInfo, 'updateUserName' | 'reset'> = {
  username: '',
};

interface UserInfo {
  username: string;
  updateUserName: (username: string) => void;
  reset: () => void;
}

export const useUserInfoStore = create<UserInfo>()((set) => ({
  username: '',
  updateUserName: (value) => set(() => ({ username: value })),
  reset: () => set(() => ({ ...userInfoDefaultStore })),
}));
