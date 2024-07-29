import type { AxiosResponse } from 'axios';

import type {
  IAddWorkRequest,
  IDeleteWorkRequest,
  IFetchWorkListRequest,
  ISearchWorkList,
  IUpdateWorkCategoryRequest,
  IUpdateWorkContentRequest,
  IUpdateWorkOrderRequest,
  IUpdateWorkStateRequest,
  IWork,
  ICommonResponse,
} from '~/types';
import { httpWithAuth } from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const addWork = ({ title, category, content, date, deadline }: IAddWorkRequest) => {
  return httpWithAuth.post<IAddWorkRequest, ICommonResponse>('/works', {
    title,
    category,
    content,
    date,
    deadline,
  });
};

export const deleteWork = async ({ id }: IDeleteWorkRequest) => {
  const response = await httpWithAuth.delete<IDeleteWorkRequest, AxiosResponse<ICommonResponse>>(`/works/${id}`);
  return response?.data;
};

export const updateWorkCategory = async ({ category, id }: IUpdateWorkCategoryRequest) => {
  const response = await httpWithAuth.patch<IUpdateWorkCategoryRequest, ICommonResponse>(`/works/${id}/category`, {
    category,
  });
  return response.data;
};

export const updateWorkState = async ({ state, id }: IUpdateWorkStateRequest) => {
  const response = await httpWithAuth.patch<IUpdateWorkStateRequest, ICommonResponse>(`/works/${id}/state`, {
    state,
  });
  return response.data;
};

export const updateWorkContent = async ({ content, id }: IUpdateWorkContentRequest) => {
  const response = await httpWithAuth.patch<IUpdateWorkContentRequest, ICommonResponse>(`/works/${id}/content`, {
    content,
  });
  return response.data;
};

export const updateWorkOrder = async ({ order, id }: IUpdateWorkOrderRequest) => {
  const response = await httpWithAuth.patch<IUpdateWorkOrderRequest, ICommonResponse>(`/works/${id}/order`, { order });
  return response.data;
};

export const updateWork = async (params: IWork) => {
  const response = await httpWithAuth.put<IWork, AxiosResponse<ICommonResponse>>(`/works/${params.id}`, params);

  return response?.data;
};

export const fetchWorkList = async (params: IFetchWorkListRequest) => {
  const response = await httpWithAuth.get<IFetchWorkListRequest, AxiosResponse<ICommonResponse<IWork[]>>>(`/works`, {
    params: {
      date: params.date,
    },
  });

  return response.data?.data;
};

export const searchWorkList = async (key: string): Promise<ISearchWorkList> => {
  const response = await httpWithAuth.get<string, AxiosResponse<ICommonResponse<ISearchWorkList>>>('/works/search', {
    params: {
      key,
    },
  });

  return response.data.data;
};
