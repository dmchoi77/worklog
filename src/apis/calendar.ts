import { IFetchCalendarDaysRequest, IFetchCalendarCommonResponse } from '~/types/apis/calendar.types';
import { ICommonResponse } from '~/types/apis/common.types';
import http from '~/utils/http';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCalendarYears = async () => {
  const response = await http.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/years', {
    baseURL,
  });

  return response.data.data?.years;
};

export const fetchCalendarMonth = async (params: number) => {
  const response = await http.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/months', {
    baseURL,
    params: {
      year: params,
    },
  });

  return response.data.data?.months;
};

export const fetchCalendarDays = async (params: IFetchCalendarDaysRequest) => {
  const response = await http.get<ICommonResponse<IFetchCalendarCommonResponse>>('/calendar/days', {
    baseURL,
    params: {
      year: params.year,
      month: params.month,
    },
  });

  return response.data.data?.days;
};
