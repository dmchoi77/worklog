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

export const addWork = ({ title, category, content, date, deadline }: IAddWorkRequest) => {
  return httpWithAuth.post<ICommonResponse>('/works', {
    title,
    category,
    content,
    date,
    deadline,
  });
};

export const deleteWork = async ({ id }: IDeleteWorkRequest) => {
  const response = await httpWithAuth.delete<ICommonResponse>(`/works/${id}`);
  return response?.data;
};

export const updateWorkCategory = async ({ category, id }: IUpdateWorkCategoryRequest) => {
  const response = await httpWithAuth.patch<ICommonResponse>(`/works/${id}/category`, {
    category,
  });
  return response.data;
};

export const updateWorkState = async ({ state, id }: IUpdateWorkStateRequest) => {
  const response = await httpWithAuth.patch<ICommonResponse>(`/works/${id}/state`, {
    state,
  });
  return response.data;
};

export const updateWorkContent = async ({ content, id }: IUpdateWorkContentRequest) => {
  const response = await httpWithAuth.patch<ICommonResponse>(`/works/${id}/content`, {
    content,
  });
  return response.data;
};

export const updateWorkOrder = async ({ order, id }: IUpdateWorkOrderRequest) => {
  const response = await httpWithAuth.patch<ICommonResponse>(`/works/${id}/order`, { order });
  return response.data;
};

export const updateWork = async (params: IWork) => {
  const response = await httpWithAuth.put<ICommonResponse>(`/works/${params.id}`, params);

  return response?.data;
};

export const fetchWorkList = async (params: IFetchWorkListRequest) => {
  const response = await httpWithAuth.get<ICommonResponse<IWork[]>>(`/works`, {
    params: {
      date: params.date,
    },
  });

  return response.data?.data;
};

export const searchWorkList = async (key: string): Promise<ISearchWorkList> => {
  const response = await httpWithAuth.get<ICommonResponse<ISearchWorkList>>('/works/search', {
    params: {
      key,
    },
  });

  return response.data.data;
};
