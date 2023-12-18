import { useMutation, useQuery } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import { addMemo, deleteMemo, fetchMemos, updateMemo } from '~/apis/memo';
import { IAddMemoRequest, IDeleteMemoRequest, IFetchMemosRequest, IUpdateMemoRequest } from '~/types/apis/memo.types';

export const memoQueryKeys = createQueryKeys('memo', {
  fetchMemos: (filters: IFetchMemosRequest) => [filters],
});

export const useAddMemo = () =>
  useMutation({
    mutationFn: ({ content, date }: IAddMemoRequest) => addMemo({ content, date }),
  });

export const useUpdateMemo = () =>
  useMutation({
    mutationFn: ({ content, id }: IUpdateMemoRequest) => updateMemo({ content, id }),
  });

export const useDeleteMemo = () =>
  useMutation({
    mutationFn: ({ id }: IDeleteMemoRequest) => deleteMemo({ id }),
  });

export const useFetchMemos = (filters: IFetchMemosRequest) =>
  useQuery({
    queryKey: memoQueryKeys.fetchMemos(filters).queryKey,
    queryFn: () => fetchMemos(filters),
  });
