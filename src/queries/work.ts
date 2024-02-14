import { useMutation, useQuery } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

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
} from '~/apis/work';
import {
  IAddWorkRequest,
  IDeleteWorkRequest,
  IFetchWorkListRequest,
  IUpdateWorkCategoryRequest,
  IUpdateWorkContentRequest,
  IUpdateWorkOrderRequest,
  IUpdateWorkStateRequest,
  IWork,
} from '~/types/apis/work.types';

export const workQueryKeys = createQueryKeys('work', {
  fetchWorkList: (filters: IFetchWorkListRequest) => [filters],
  searchWorkList: (filters: string) => [filters],
});

export const useFetchWorkList = (params: IFetchWorkListRequest) => {
  return useQuery({
    queryKey: workQueryKeys.fetchWorkList(params).queryKey,
    queryFn: () => fetchWorkList(params),
  });
};

export const useAddWork = () =>
  useMutation({
    mutationFn: (params: IAddWorkRequest) => addWork(params),
  });

export const useDeleteWork = () =>
  useMutation({
    mutationFn: (params: IDeleteWorkRequest) => deleteWork(params),
  });

export const useUpdateWorkCategory = () =>
  useMutation({
    mutationFn: (params: IUpdateWorkCategoryRequest) => updateWorkCategory(params),
  });

export const useUpdateWorkState = () =>
  useMutation({
    mutationFn: (params: IUpdateWorkStateRequest) => updateWorkState(params),
  });

export const useUpdateWorkContent = () =>
  useMutation({
    mutationFn: (params: IUpdateWorkContentRequest) => updateWorkContent(params),
  });

export const useUpdateWorkOrder = () =>
  useMutation({
    mutationFn: (params: IUpdateWorkOrderRequest) => updateWorkOrder(params),
  });

export const useUpdateWork = () =>
  useMutation({
    mutationFn: (params: IWork) => updateWork(params),
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
