import { useMutation, useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { calendarQueryKeys } from './calendar';
import { useInvalidateQueries } from '~/hooks/useInvalidateQueryKeys';
import { addMemo, deleteMemo, fetchMemoList, searchMemoList, updateMemo, updateMemoOrder } from '~/apis';
import type {
  IAddMemoRequest,
  IDeleteMemoRequest,
  IFetchMemosRequest,
  IMemo,
  IUpdateMemoOrderRequest,
  IUpdateMemoRequest,
} from '~/types';

export const memoQueryKeys = createQueryKeys('memo', {
  fetchMemoList: (filters: IFetchMemosRequest) => [filters],
  searchMemoList: (filters: string) => [filters],
});

export const useAddMemo = () => {
  const invalidateQueries = useInvalidateQueries();
  return useMutation({
    mutationFn: ({ content, date }: IAddMemoRequest) => addMemo({ content, date }),
    onSuccess: (_, { date }) => {
      invalidateQueries([calendarQueryKeys._def, memoQueryKeys.fetchMemoList({ date }).queryKey]);
    },
  });
};

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

export const useFetchMemoList = (filters: IFetchMemosRequest, initialData?: IMemo[]) =>
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
