import { AxiosResponse } from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import {
  IAddMemoRequest,
  IDeleteMemoRequest,
  IFetchMemosRequest,
  IMemo,
  IUpdateMemoOrderRequest,
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
    `/memos/${id}/content`,
    { content },
    {
      baseURL,
    },
  );
};

export const updateMemoOrder = ({ id, order }: IUpdateMemoOrderRequest) => {
  return http.patch<IUpdateMemoOrderRequest, ICommonResponse>(
    `/memos/${id}/order`,
    {
      order,
    },
    {
      baseURL,
    },
  );
};

export const deleteMemo = async ({ id }: IDeleteMemoRequest) => {
  const response = await http.delete<IDeleteMemoRequest, AxiosResponse<ICommonResponse>>(`/memos/${id}`, {
    baseURL,
  });
  return response?.data;
};

export const fetchMemoList = async ({ startDate, endDate }: IFetchMemosRequest) => {
  const response = await http.get<IFetchMemosRequest, AxiosResponse<ICommonResponse<{ content: IMemo[] }>>>('/memos', {
    baseURL,
    params: {
      startDate,
      endDate,
    },
  });

  return response?.data?.data?.content;
};
