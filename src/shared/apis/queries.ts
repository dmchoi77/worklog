import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { logout } from './fetch';
import { httpWithAuth } from '../utils/http';
import { getQueryClient } from '~/app/getQueryClient';

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      httpWithAuth.defaults.headers.Authorization = null;
      getQueryClient().removeQueries();
      router.push('/login');
    },
  });
};
