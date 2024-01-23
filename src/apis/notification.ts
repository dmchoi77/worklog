import { ICommonResponse } from '~/types/apis/common.types';
import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const connectServerSentEvent = ()=> {  }

// 마지막 알림 체크
export const checkNotification = async () => {
  const response = await http.get<ICommonResponse<{ isTimeToNotice: boolean }>>('/notifications/noticed-at/check', {
    baseURL,
  });

  return response?.data?.data?.isTimeToNotice;
};

// 알림 보내기
export const triggerNotification = async () => {
  const response = await http.post<ICommonResponse>(
    '/notifications/trigger',
    {},
    {
      baseURL,
    },
  );

  return response;
};
