import { AxiosResponse } from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import {
  IAddMemoRequest,
  IDeleteMemoRequest,
  IFetchMemosRequest,
  IMemo,
  IUpdateMemoRequest,
} from '~/types/apis/memo.types';
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

export const updateMemo = ({ content, id }: IUpdateMemoRequest) => {
  return http.patch<IUpdateMemoRequest, ICommonResponse>(
    `/memos/${id}`,
    { content, id },
    {
      baseURL,
    },
  );
};

export const deleteMemo = ({ id }: IDeleteMemoRequest) => {
  return http.delete<IDeleteMemoRequest, ICommonResponse>(`/memos/${id}`, {
    baseURL,
  });
};

export const fetchMemos = async ({ startDate, endDate }: IFetchMemosRequest) => {
  const response = await http.get<IFetchMemosRequest, AxiosResponse<ICommonResponse<{ content: IMemo[] }>>>('/memos', {
    baseURL,
    params: {
      startDate,
      endDate,
    },
  });

  return response?.data?.data?.content;
};
