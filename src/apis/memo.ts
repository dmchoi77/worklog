import { AxiosResponse } from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import {
  IAddMemoRequest,
  IDeleteMemoRequest,
  IFetchMemosRequest,
  IMemo,
  ISearchMemoList,
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

export const fetchMemoList = async ({ date }: IFetchMemosRequest) => {
  const response = await http.get<IFetchMemosRequest, AxiosResponse<ICommonResponse<IMemo[]>>>('/memos', {
    baseURL,
    params: {
      date: date,
    },
  });

  return response?.data?.data;
};

export const searchMemoList = async (key: string): Promise<ISearchMemoList> => {
  const response = await http.get<string, AxiosResponse<ICommonResponse<ISearchMemoList>>>('/memos/search', {
    params: {
      key,
    },
    baseURL,
  });

  return response.data.data;
};
