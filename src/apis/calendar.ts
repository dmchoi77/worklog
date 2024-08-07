import type { IFetchCalendarDaysRequest, IFetchCalendarCommonResponse, ICommonResponse } from '~/types';
import { httpWithAuth } from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCalendarYears = async () => {
  const { data } = await httpWithAuth.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/years', {
    baseURL,
  });

  return data.data?.years;
};

export const fetchCalendarMonth = async (params: number) => {
  const { data } = await httpWithAuth.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/months', {
    baseURL,
    params: {
      year: params,
    },
  });

  return data.data?.months;
};

export const fetchCalendarDays = async (params: IFetchCalendarDaysRequest) => {
  const { data } = await httpWithAuth.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/days', {
    baseURL,
    params: {
      year: params.year,
      month: params.month,
    },
  });

  return data.data?.days;
};
