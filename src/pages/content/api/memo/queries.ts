import { useMutation, useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { addMemo, deleteMemo, fetchMemoList, searchMemoList, updateMemo, updateMemoOrder } from './fetch';
import { FetchMemosRequest, Memo } from './types';
import { calendarQueryKeys } from '../calendar/queries';
import { useInvalidateQueries } from '~/shared/hooks/useInvalidateQueries';

export const memoQueryKeys = createQueryKeys('memo', {
  fetchMemoList: (filters: FetchMemosRequest) => [filters],
  searchMemoList: (filters: string) => [filters],
});

export const useAddMemo = () => {
  const invalidateQueries = useInvalidateQueries();
  return useMutation({
    mutationFn: addMemo,
    onSuccess: (_, { date }) => {
      invalidateQueries([calendarQueryKeys._def, memoQueryKeys.fetchMemoList({ date }).queryKey]);
    },
  });
};

export const useUpdateMemo = () =>
  useMutation({
    mutationFn: updateMemo,
  });

export const useUpdateMemoOrder = () =>
  useMutation({
    mutationFn: updateMemoOrder,
  });

export const useDeleteMemo = () =>
  useMutation({
    mutationFn: deleteMemo,
  });

export const useFetchMemoList = (filters: FetchMemosRequest, initialData?: Memo[]) =>
  useQuery({
    queryKey: memoQueryKeys.fetchMemoList(filters).queryKey,
    queryFn: () => fetchMemoList(filters),
    initialData,
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
