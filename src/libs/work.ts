import { fetchRSC } from '~/shared/utils/fetchRSC';

export const endpoint = {
  addWork: '/works',
  updateWork: '/works/:id/content',
  updateWorkOrder: '/works/:id/order',
  deleteWork: '/works/:id',
  fetchWorkList: '/works',
  searchWorkList: '/works/search',
};

export const fetchWorkList = async (date: string) => {
  const data = await fetchRSC(`${endpoint.fetchWorkList}?date=${date}`);
  return data;
};
