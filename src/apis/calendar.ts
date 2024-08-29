import { httpWithAuth } from '~/utils/http';

import type { IFetchCalendarDaysRequest, IFetchCalendarCommonResponse, ICommonResponse } from '~/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCalendarYears = async () => {
  const { data } = await httpWithAuth.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/years', {
    baseURL,
  });

  return data.data?.years;
};

export const fetchCalendarMonth = async (year: number) => {
  const { data } = await httpWithAuth.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/months', {
    baseURL,
    params: {
      year,
    },
  });

  return data.data?.months;
};

export const fetchCalendarDays = async ({ month, year }: IFetchCalendarDaysRequest) => {
  const { data } = await httpWithAuth.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/days', {
    baseURL,
    params: {
      year,
      month,
    },
  });

  return data.data.days;
};
