import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { login } from './fetch';
import { useDialogStore } from '~/shared/stores/useDialogStore';
import { useUserInfoStore } from '~/shared/stores/useUserInfoStore';
import { commonResponseErrorHandler } from '~/shared/utils/http';

export const useLogin = () => {
  const router = useRouter();

  const updateUserInfoState = useUserInfoStore((state) => state.updateUserName);
  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  return useMutation({
    mutationFn: login,
    onSuccess: (_, variable) => {
      updateUserInfoState(variable.username);
      router.push('/today');
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
