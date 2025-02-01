import {
  AddMemoRequest,
  UpdateMemoRequest,
  UpdateMemoOrderRequest,
  DeleteMemoRequest,
  FetchMemosRequest,
  Memo,
  SearchMemoList,
} from './types';
import { fetchRSC } from '~/shared/utils/fetchRSC';
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

export const fetchMemoList = async ({ date }: FetchMemosRequest): Promise<Memo[]> => {
  const { data } = await httpWithAuth.get('/memos', {
    params: {
      date: date,
    },
  });

  return data;
};

export const searchMemoList = async (key: string): Promise<SearchMemoList> => {
  const { data } = await httpWithAuth.get('/memos/search', {
    params: {
      key,
    },
  });

  return data;
};

export const fetchMemoListWithRSC = async (date: string): Promise<Memo[]> => {
  const { data } = await fetchRSC(`/memos?date=${date}`);
  return data;
};
