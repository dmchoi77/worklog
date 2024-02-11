import { AxiosResponse } from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import {
  IAddWorkRequest,
  IDeleteWorkRequest,
  IFetchWorkListRequest,
  ISearchWorkList,
  IUpdateWorkCategoryRequest,
  IUpdateWorkContentRequest,
  IUpdateWorkOrderRequest,
  IUpdateWorkStateRequest,
  IWork,
} from '~/types/apis/work.types';
import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const addWork = ({ title, category, content, date, deadline }: IAddWorkRequest) => {
  return http.post<IAddWorkRequest, ICommonResponse>(
    '/works',
    {
      title,
      category,
      content,
      date,
      deadline,
    },
    {
      baseURL,
    },
  );
};

export const deleteWork = async ({ id }: IDeleteWorkRequest) => {
  const response = await http.delete<IDeleteWorkRequest, AxiosResponse<ICommonResponse>>(`/works/${id}`, {
    baseURL,
  });
  return response?.data;
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
  const response = await http.put<IWork, AxiosResponse<ICommonResponse>>(
    `/works/${params.id}`,
    {
      ...params,
    },
    {
      baseURL,
    },
  );

  return response?.data;
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

export const searchWorkList = async (key: string): Promise<ISearchWorkList> => {
  const response = await http.get<string, AxiosResponse<ICommonResponse<ISearchWorkList>>>('/works/search', {
    params: {
      key,
    },
    baseURL,
  });

  return response.data.data;
};
