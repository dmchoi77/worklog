import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { AxiosError } from 'axios';
import { checkEmail, checkUsername } from '../api';
import { getQueryClient } from '~/app/getQueryClient';
import { ICommonResponse } from '~/shared/types';

const userQueryKeys = createQueryKeys('user', {
  checkEmail: ['checkEmail'],
  checkUsername: ['checkUsername'],
});

export const useCheckEmail = (email: string) => {
  const query = useQuery<ICommonResponse, AxiosError>({
    queryKey: userQueryKeys.checkEmail.queryKey,
    queryFn: () => checkEmail({ email }),
    enabled: false,
  });

  useEffect(() => {
    if (query.error) {
      getQueryClient().setQueryData(userQueryKeys.checkEmail.queryKey, query.error?.response?.data);
    }
  }, [query.error]);

  return query;
};

export const useCheckUsername = (username: string) => {
  const query = useQuery<ICommonResponse, AxiosError>({
    queryKey: userQueryKeys.checkUsername.queryKey,
    queryFn: () => checkUsername({ username }),
    enabled: false,
  });
  useEffect(() => {
    if (query.error) {
      getQueryClient().setQueryData(userQueryKeys.checkUsername.queryKey, query.error?.response?.data);
    }
  }, [query.error]);

  return query;
};
