import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { fetchWorkList, FetchWorkListRequest, searchWorkList, Work } from '../api';

export const workQueryKeys = createQueryKeys('work', {
  fetchWorkList: (filters: FetchWorkListRequest) => [filters],
  searchWorkList: (filters: string) => [filters],
});

export const useFetchWorkList = (params: FetchWorkListRequest, initialData?: Work[]) => {
  return useQuery({
    queryKey: workQueryKeys.fetchWorkList(params).queryKey,
    queryFn: () => fetchWorkList(params),
    initialData,
  });
};

export const useSearchWorkList = (key: string) =>
  useQuery({
    queryKey: workQueryKeys.searchWorkList(key).queryKey,
    queryFn: () => searchWorkList(key),
    enabled: !!key,
    initialData: {
      content: [],
      pageNumber: 0,
      pageSize: 0,
      lastPage: 0,
    },
    staleTime: 0,
  });
