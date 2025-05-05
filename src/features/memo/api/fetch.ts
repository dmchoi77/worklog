import { AddMemoRequest, UpdateMemoRequest, UpdateMemoOrderRequest, DeleteMemoRequest } from './types';
import { httpWithAuth } from '~/shared/utils/http';

export const addMemo = ({ content, date }: AddMemoRequest) => {
  return httpWithAuth.post('/memos', {
    content,
    date,
  });
};

export const updateMemo = ({ content, id }: UpdateMemoRequest) => {
  return httpWithAuth.patch(`/memos/${id}/content`, { content });
};

export const updateMemoOrder = ({ id, order }: UpdateMemoOrderRequest) => {
  return httpWithAuth.patch(`/memos/${id}/order`, {
    order,
  });
};

export const deleteMemo = async ({ id }: DeleteMemoRequest) => {
  const { data } = await httpWithAuth.delete(`/memos/${id}`);
  return data;
};
