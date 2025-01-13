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

export const deleteWork = async ({ id }: IDeleteWorkRequest): Promise<ICommonResponse> => {
  const { data } = await httpWithAuth.delete(`/works/${id}`);
  return data;
};

export const updateWorkCategory = async ({ category, id }: IUpdateWorkCategoryRequest): Promise<ICommonResponse> => {
  const { data } = await httpWithAuth.patch(`/works/${id}/category`, {
    category,
  });
  return data;
};

export const updateWorkState = async ({ state, id }: IUpdateWorkStateRequest): Promise<ICommonResponse> => {
  const { data } = await httpWithAuth.patch(`/works/${id}/state`, {
    state,
  });
  return data;
};

export const updateWorkContent = async ({ content, id }: IUpdateWorkContentRequest): Promise<ICommonResponse> => {
  const { data } = await httpWithAuth.patch(`/works/${id}/content`, {
    content,
  });
  return data;
};

export const updateWorkOrder = async ({ order, id }: IUpdateWorkOrderRequest): Promise<ICommonResponse> => {
  const { data } = await httpWithAuth.patch(`/works/${id}/order`, { order });
  return data;
};

export const updateWork = async (params: IWork): Promise<ICommonResponse> => {
  const { data } = await httpWithAuth.put(`/works/${params.id}`, params);

  return data;
};

export const fetchWorkList = async (params: IFetchWorkListRequest): Promise<IWork[]> => {
  const { data } = await httpWithAuth.get(`/works`, {
    params: {
      date: params.date,
    },
  });

  return data;
};

export const searchWorkList = async (key: string): Promise<ISearchWorkList> => {
  const { data } = await httpWithAuth.get('/works/search', {
    params: {
      key,
    },
  });

  return data;
};
