import { FetchMemosRequest, Memo, SearchMemoList } from './types';
import { httpWithAuth } from '~/shared/utils/http';

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
