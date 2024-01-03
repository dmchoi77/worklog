import { useMutation, useQuery } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import {
  addWork,
  fetchWorkList,
  updateWork,
  updateWorkCategory,
  updateWorkContent,
  updateWorkOrder,
  updateWorkState,
} from '~/apis/work';
import {
  IAddWorkRequest,
  IFetchWorkListRequest,
  IUpdateWorkCategoryRequest,
  IUpdateWorkContentRequest,
  IUpdateWorkOrderRequest,
  IUpdateWorkStateRequest,
  IWork,
} from '~/types/apis/work.types';

export const workQueryKeys = createQueryKeys('work', {
  fetchWorkList: (filters: IFetchWorkListRequest) => [filters],
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
