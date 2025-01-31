import { httpWithAuth } from '~/shared/utils/http';
import type { ICommonResponse } from '~/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const connectServerSentEvent = ()=> {  }

// 마지막 알림 체크
export const checkNotification = async () => {
  const { data } = await httpWithAuth.get<{ isTimeToNotice: boolean }>('/notifications/noticed-at/check');

  return data.isTimeToNotice;
};

// 알림 보내기
export const triggerNotification = async () => {
  const { data } = await httpWithAuth.post<ICommonResponse>('/notifications/trigger');

  return data;
};
