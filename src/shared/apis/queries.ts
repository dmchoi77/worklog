import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { logout, reissue } from './fetch';
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

export const useReissue = () => {
  const router = useRouter();

  const { isSuccess, isError, data, refetch } = useQuery({
    queryKey: ['reissue'],
    queryFn: reissue,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) httpWithAuth.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      httpWithAuth.defaults.headers.Authorization = null;
      getQueryClient().removeQueries();
      router.push('/login');
    }
  }, [isError]);

  return { isSuccess, data, refetch };
};
