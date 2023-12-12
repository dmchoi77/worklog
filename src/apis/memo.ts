import { ICommonResponse } from '~/types/apis/common.types';
import { IAddMemoRequest, IDeleteMemoRequest, IUpdateMemoRequest } from '~/types/apis/memo.types';
import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const addMemo = ({ content, date }: IAddMemoRequest) => {
  return http.post<IAddMemoRequest, ICommonResponse>(
    '/memos',
    {
      content,
      date,
    },
    {
      baseURL,
    },
  );
};

export const updateMemo = ({ content, date, id }: IUpdateMemoRequest) => {
  return http.put<IUpdateMemoRequest, ICommonResponse>(
    `/memos/${id}`,
    { content, date, id },
    {
      baseURL,
    },
  );
};

export const deleteMemo = ({ content, date, id, username }: IDeleteMemoRequest) => {
  return http.delete<IDeleteMemoRequest, ICommonResponse>(`/memos/${id}`, {
    data: {
      content,
      date,
      id,
      username,
    },
    baseURL,
  });
};
