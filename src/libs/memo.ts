import { fetchRSC } from '~/shared/utils/fetchRSC';

export const endpoint = {
  addMemo: '/memos',
  updateMemo: '/memos/:id/content',
  updateMemoOrder: '/memos/:id/order',
  deleteMemo: '/memos/:id',
  fetchMemoList: '/memos',
  searchMemoList: '/memos/search',
};

export const fetchMemoList = async (date: string) => {
  const data = await fetchRSC(`${endpoint.fetchMemoList}?date=${date}`);
  return data;
};
