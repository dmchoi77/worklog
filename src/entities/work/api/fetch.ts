import { FetchWorkListRequest, SearchWorkList, Work } from './types';
import { httpWithAuth } from '~/shared/utils/http';

export const fetchWorkList = async (params: FetchWorkListRequest): Promise<Work[]> => {
  const { data } = await httpWithAuth.get(`/works`, {
    params: {
      date: params.date,
    },
  });

  return data;
};

export const searchWorkList = async (key: string): Promise<SearchWorkList> => {
  const { data } = await httpWithAuth.get('/works/search', {
    params: {
      key,
    },
  });

  return data;
};
