import { useMutation, useQuery } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import { addMemo, deleteMemo, fetchMemoList, searchMemoList, updateMemo, updateMemoOrder } from '~/apis/memo';
import {
  IAddMemoRequest,
  IDeleteMemoRequest,
  IFetchMemosRequest,
  IUpdateMemoOrderRequest,
  IUpdateMemoRequest,
} from '~/types/apis/memo.types';

export const memoQueryKeys = createQueryKeys('memo', {
  fetchMemoList: (filters: IFetchMemosRequest) => [filters],
  searchMemoList: (filters: string) => [filters],
});

export const useAddMemo = () =>
  useMutation({
    mutationFn: ({ content, date }: IAddMemoRequest) => addMemo({ content, date }),
  });

export const useUpdateMemo = () =>
  useMutation({
    mutationFn: ({ content, id }: IUpdateMemoRequest) => updateMemo({ content, id }),
  });

export const useUpdateMemoOrder = () =>
  useMutation({
    mutationFn: ({ id, order }: IUpdateMemoOrderRequest) => updateMemoOrder({ id, order }),
  });

export const useDeleteMemo = () =>
  useMutation({
    mutationFn: ({ id }: IDeleteMemoRequest) => deleteMemo({ id }),
  });

export const useFetchMemoList = (filters: IFetchMemosRequest) =>
  useQuery({
    queryKey: memoQueryKeys.fetchMemoList(filters).queryKey,
    queryFn: () => fetchMemoList(filters),
  });

export const useSearchMemoList = (key: string) =>
  useQuery({
    queryKey: memoQueryKeys.searchMemoList(key).queryKey,
    queryFn: () => searchMemoList(key),
    enabled: !!key,
    initialData: {
      content: [],
      pageNumber: 0,
      pageSize: 0,
      lastPage: 0,
    },
    staleTime: 0,
  });
