import { CalendarYearsResponse, CalendarMonthsResponse, FetchCalendarDaysRequest, CalendarDaysResponse } from './types';
import { httpWithAuth } from '~/shared/utils/http';

export const fetchCalendarYears = async () => {
  const { data } = await httpWithAuth.get<CalendarYearsResponse>('/calendar/years');

  return data.years;
};

export const fetchCalendarMonth = async (year: number) => {
  const { data } = await httpWithAuth.get<CalendarMonthsResponse>('/calendar/months', {
    params: {
      year,
    },
  });

  return data.months;
};

export const fetchCalendarDays = async ({ month, year }: FetchCalendarDaysRequest) => {
  const { data } = await httpWithAuth.get<CalendarDaysResponse>('/calendar/days', {
    params: {
      year,
      month,
    },
  });

  return data.days;
};
