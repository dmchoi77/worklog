import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { login, signIn } from '../api';
import { useDialogStore } from '~/shared/stores/useDialogStore';
import { useUserInfoStore } from '~/shared/stores/useUserInfoStore';
import { getTodayDate } from '~/shared/utils/date';
import { httpWithAuth, commonResponseErrorHandler } from '~/shared/utils/http';

const todayDate = getTodayDate();

export const useLogin = () => {
  const router = useRouter();

  const updateUserInfoState = useUserInfoStore((state) => state.updateUserName);
  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  return useMutation({
    mutationFn: login,
    onSuccess: (data, variable) => {
      updateUserInfoState(variable.username);
      httpWithAuth.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
      router.push(`/content/${todayDate}`);
    },
    onError: (error: any) => {
      const errorResponse = commonResponseErrorHandler(error);
      updateDialogState({
        open: true,
        mainText: errorResponse?.message || '서버 점검 중입니다.',
        cancelText: '',
      });
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();

  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      updateDialogState({
        open: true,
        mainText: '회원가입에 성공하였습니다.',
        cancelText: '',
        handleConfirm: () => {
          router.push('/login');
        },
      });
    },
    onError: (error: any) => {
      updateDialogState({
        open: true,
        mainText: error?.response?.data?.message || '서버 점검 중입니다.',
        cancelText: '',
      });
    },
  });
};
