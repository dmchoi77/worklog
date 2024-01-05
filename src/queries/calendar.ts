import { useQuery } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import { fetchCalendarDays, fetchCalendarMonth, fetchCalendarYears } from '~/apis/calendar';
import { IFetchCalendarDaysRequest } from '~/types/apis/calendar.types';

export const calendarQueryKeys = createQueryKeys('calendar', {
  fetchCalendarYears: ['fetchCalendarYears'],
  fetchCalendarMonth: (filter: number) => [filter],
  fetchCalendarDays: (filter: IFetchCalendarDaysRequest) => [filter],
});

export const useFetchCalendarYears = () =>
  useQuery({
    queryKey: calendarQueryKeys.fetchCalendarYears.queryKey,
    queryFn: fetchCalendarYears,
  });

export const useFetchCalendarMonth = (year: number) =>
  useQuery({
    queryKey: calendarQueryKeys.fetchCalendarMonth(year).queryKey,
    queryFn: () => fetchCalendarMonth(year),
    enabled: !!year,
  });

export const useFetchCalendarDays = (params: IFetchCalendarDaysRequest) =>
  useQuery({
    queryKey: calendarQueryKeys.fetchCalendarDays(params).queryKey,
    queryFn: async () => await fetchCalendarDays(params),
    enabled: !!params.month && !!params.year,
  });
