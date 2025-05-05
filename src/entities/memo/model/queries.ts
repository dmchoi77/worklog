import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { FetchMemosRequest, fetchMemoList, searchMemoList } from '../api';

export const memoQueryKeys = createQueryKeys('memo', {
  fetchMemoList: (filters: FetchMemosRequest) => [filters],
  searchMemoList: (filters: string) => [filters],
});

export const useFetchMemoList = (filters: FetchMemosRequest) =>
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
