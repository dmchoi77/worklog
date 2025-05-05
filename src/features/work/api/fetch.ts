import type {
  AddWorkRequest,
  DeleteWorkRequest,
  UpdateWorkCategoryRequest,
  UpdateWorkContentRequest,
  UpdateWorkOrderRequest,
  UpdateWorkStateRequest,
} from './types';
import { Work } from '~/entities/work/api';
import { httpWithAuth } from '~/shared/utils/http';

export const addWork = ({ title, category, content, date, deadline }: AddWorkRequest) =>
  httpWithAuth.post('/works', {
    title,
    category,
    content,
    date,
    deadline,
  });

export const deleteWork = async ({ id }: DeleteWorkRequest) => {
  const { data } = await httpWithAuth.delete(`/works/${id}`);
  return data;
};

export const updateWorkCategory = async ({ category, id }: UpdateWorkCategoryRequest) => {
  const { data } = await httpWithAuth.patch(`/works/${id}/category`, {
    category,
  });
  return data;
};

export const updateWorkState = async ({ state, id }: UpdateWorkStateRequest) => {
  const { data } = await httpWithAuth.patch(`/works/${id}/state`, {
    state,
  });
  return data;
};

export const updateWorkContent = async ({ content, id }: UpdateWorkContentRequest) => {
  const { data } = await httpWithAuth.patch(`/works/${id}/content`, {
    content,
  });
  return data;
};

export const updateWorkOrder = async ({ order, id }: UpdateWorkOrderRequest) => {
  const { data } = await httpWithAuth.patch(`/works/${id}/order`, { order });
  return data;
};

export const updateWork = async (params: Work) => {
  const { data } = await httpWithAuth.put(`/works/${params.id}`, params);

  return data;
};
