import { httpWithAuth } from '~/utils/http';

import type {
  CalendarYearsResponse,
  CalendarMonthsResponse,
  CalendarDaysResponse,
  FetchCalendarDaysRequest,
} from '~/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCalendarYears = async () => {
  const { data } = await httpWithAuth.get<CalendarYearsResponse>('/calendar/years', {
    baseURL,
  });

  return data.years;
};

export const fetchCalendarMonth = async (year: number) => {
  const { data } = await httpWithAuth.get<CalendarMonthsResponse>('/calendar/months', {
    baseURL,
    params: {
      year,
    },
  });

  return data.months;
};

export const fetchCalendarDays = async ({ month, year }: FetchCalendarDaysRequest) => {
  const { data } = await httpWithAuth.get<CalendarDaysResponse>('/calendar/days', {
    baseURL,
    params: {
      year,
      month,
    },
  });

  return data.days;
};
