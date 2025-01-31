import { httpWithAuth } from '~/shared/utils/http';
import type {
  IAddMemoRequest,
  IDeleteMemoRequest,
  IFetchMemosRequest,
  IMemo,
  ISearchMemoList,
  IUpdateMemoOrderRequest,
  IUpdateMemoRequest,
} from '~/types';

export const addMemo = ({ content, date }: IAddMemoRequest) => {
  return httpWithAuth.post('/memos', {
    content,
    date,
  });
};

export const updateMemo = ({ content, id }: IUpdateMemoRequest) => {
  return httpWithAuth.patch(`/memos/${id}/content`, { content });
};

export const updateMemoOrder = ({ id, order }: IUpdateMemoOrderRequest) => {
  return httpWithAuth.patch(`/memos/${id}/order`, {
    order,
  });
};

export const deleteMemo = async ({ id }: IDeleteMemoRequest) => {
  const { data } = await httpWithAuth.delete(`/memos/${id}`);
  return data;
};

export const fetchMemoList = async ({ date }: IFetchMemosRequest) => {
  const { data } = await httpWithAuth.get<IMemo[]>('/memos', {
    params: {
      date: date,
    },
  });

  return data;
};

export const searchMemoList = async (key: string): Promise<ISearchMemoList> => {
  const { data } = await httpWithAuth.get<ISearchMemoList>('/memos/search', {
    params: {
      key,
    },
  });

  return data;
};
