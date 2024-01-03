import { AxiosResponse } from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import {
  IAddWorkRequest,
  IFetchWorkListRequest,
  IUpdateWorkCategoryRequest,
  IUpdateWorkContentRequest,
  IUpdateWorkOrderRequest,
  IUpdateWorkStateRequest,
  IWork,
} from '~/types/apis/work.types';
import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const addWork = ({ title, category, content, date }: IAddWorkRequest) => {
  return http.post<IAddWorkRequest, ICommonResponse>(
    '/works',
    {
      title,
      category,
      content,
      date,
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

export const updateWork = async (params: IWork) => {
  const response = await http.put<IWork, ICommonResponse>(
    `/works/${params.id}`,
    {
      ...params,
    },
    {
      baseURL,
    },
  );

  return response.data;
};

export const fetchWorkList = async (params: IFetchWorkListRequest) => {
  const response = await http.get<IFetchWorkListRequest, AxiosResponse<ICommonResponse<IWork[]>>>(`/works`, {
    baseURL,
    params: {
      date: params.date,
    },
  });

  return response.data?.data;
};
