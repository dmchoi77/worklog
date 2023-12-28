import { ICommonResponse } from '~/types/apis/common.types';
import {
  IAddWorkRequest,
  IFetchWorkListRequest,
  IUpdateWorkCategoryRequest,
  IUpdateWorkContentRequest,
  IUpdateWorkOrderRequest,
  IUpdateWorkStateRequest,
} from '~/types/apis/work.types';
import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const addWork = (params: IAddWorkRequest) => {
  return http.post<IAddWorkRequest, ICommonResponse>(
    '/works',
    {
      params,
    },
    {
      baseURL,
    },
  );
};

export const updateWorkCategory = async ({ category, id }: IUpdateWorkCategoryRequest) => {
  const response = await http.patch<IUpdateWorkCategoryRequest, ICommonResponse>(
    `/works/${id}/category`,
    {
      category,
    },
    {
      baseURL,
    },
  );
  return response.data;
};

export const updateWorkState = async ({ state, id }: IUpdateWorkStateRequest) => {
  const response = await http.patch<IUpdateWorkStateRequest, ICommonResponse>(
    `/works/${id}/state`,
    {
      state,
    },
    {
      baseURL,
    },
  );
  return response.data;
};

export const updateWorkContent = async ({ content, id }: IUpdateWorkContentRequest) => {
  const response = await http.patch<IUpdateWorkContentRequest, ICommonResponse>(
    `/works/${id}/content`,
    { content },
    {
      baseURL,
    },
  );
  return response.data;
};

export const updateWorkOrder = async ({ order, id }: IUpdateWorkOrderRequest) => {
  const response = await http.patch<IUpdateWorkOrderRequest, ICommonResponse>(
    `/works/${id}/order`,
    { order },
    {
      baseURL,
    },
  );
  return response.data;
};

export const deleteWork = async (params: number) => {
  const response = await http.delete<number, ICommonResponse>(`/works/${params}`, {
    baseURL,
  });
  return response?.data;
};

export const fetchWorkList = async (params: IFetchWorkListRequest) => {
  const response = await http.get<IFetchWorkListRequest, ICommonResponse>(`/works`, {
    baseURL,
    params: {
      startDate: params.startDate,
      endDate: params.endDate,
    },
  });

  return response.data;
};
