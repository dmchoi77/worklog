import { httpWithAuth } from '~/utils/http';
import type {
  IAddMemoRequest,
  IDeleteMemoRequest,
  IFetchMemosRequest,
  IMemo,
  ISearchMemoList,
  IUpdateMemoOrderRequest,
  IUpdateMemoRequest,
  ICommonResponse,
} from '~/types';

export const addMemo = ({ content, date }: IAddMemoRequest) => {
  return httpWithAuth.post<IAddMemoRequest, ICommonResponse>('/memos', {
    content,
    date,
  });
};

export const updateMemo = ({ content, id }: IUpdateMemoRequest) => {
  return httpWithAuth.patch<ICommonResponse>(`/memos/${id}/content`, { content });
};

export const updateMemoOrder = ({ id, order }: IUpdateMemoOrderRequest) => {
  return httpWithAuth.patch<ICommonResponse>(`/memos/${id}/order`, {
    order,
  });
};

export const deleteMemo = async ({ id }: IDeleteMemoRequest) => {
  const { data } = await httpWithAuth.delete<ICommonResponse>(`/memos/${id}`);
  return data;
};

export const fetchMemoList = async ({ date }: IFetchMemosRequest) => {
  const { data } = await httpWithAuth.get<ICommonResponse<IMemo[]>>('/memos', {
    params: {
      date: date,
    },
  });

  return data;
};

export const searchMemoList = async (key: string): Promise<ISearchMemoList> => {
  const { data } = await httpWithAuth.get<ICommonResponse<ISearchMemoList>>('/memos/search', {
    params: {
      key,
    },
  });

  return data;
};
