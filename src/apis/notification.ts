import type { ICommonResponse } from '~/types';
import { httpWithAuth } from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const connectServerSentEvent = ()=> {  }

// 마지막 알림 체크
export const checkNotification = async () => {
  const response = await httpWithAuth.get<ICommonResponse<{ isTimeToNotice: boolean }>>(
    '/notifications/noticed-at/check',
  );

  return response?.data?.data?.isTimeToNotice;
};

// 알림 보내기
export const triggerNotification = async () => {
  const response = await httpWithAuth.post<ICommonResponse>('/notifications/trigger');

  return response;
};
