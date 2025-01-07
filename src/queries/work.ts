import { useMutation, useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { calendarQueryKeys } from './calendar';
import { useInvalidateQueries } from '~/hooks/useInvalidateQueryKeys';
import {
  addWork,
  deleteWork,
  fetchWorkList,
  searchWorkList,
  updateWork,
  updateWorkCategory,
  updateWorkContent,
  updateWorkOrder,
  updateWorkState,
} from '~/apis';
import type { IFetchWorkListRequest, IWork } from '~/types';

export const workQueryKeys = createQueryKeys('work', {
  fetchWorkList: (filters: IFetchWorkListRequest) => [filters],
  searchWorkList: (filters: string) => [filters],
});

export const useFetchWorkList = (params: IFetchWorkListRequest, initialData?: IWork[]) => {
  return useQuery({
    queryKey: workQueryKeys.fetchWorkList(params).queryKey,
    queryFn: () => fetchWorkList(params),
    initialData,
  });
};

export const useAddWork = () => {
  const invalidateQueries = useInvalidateQueries();
  return useMutation({
    mutationFn: addWork,
    onSuccess: (_, { date }) => {
      invalidateQueries([workQueryKeys.fetchWorkList({ date }).queryKey, calendarQueryKeys._def]);
    },
  });
};

export const useDeleteWork = () =>
  useMutation({
    mutationFn: deleteWork,
  });

export const useUpdateWorkCategory = () =>
  useMutation({
    mutationFn: updateWorkCategory,
  });

export const useUpdateWorkState = () =>
  useMutation({
    mutationFn: updateWorkState,
  });

export const useUpdateWorkContent = () =>
  useMutation({
    mutationFn: updateWorkContent,
  });

export const useUpdateWorkOrder = () =>
  useMutation({
    mutationFn: updateWorkOrder,
  });

export const useUpdateWork = () =>
  useMutation({
    mutationFn: updateWork,
  });

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
