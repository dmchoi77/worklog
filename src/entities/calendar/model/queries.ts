import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { fetchCalendarYears, fetchCalendarMonth, fetchCalendarDays } from '../api/fetch';
import { FetchCalendarDaysRequest } from '../api/types';

export const calendarQueryKeys = createQueryKeys('calendar', {
  fetchCalendarYears: ['fetchCalendarYears'],
  fetchCalendarMonth: (filter: number) => [filter],
  fetchCalendarDays: (filter: FetchCalendarDaysRequest) => [filter],
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

export const useFetchCalendarDays = (params: FetchCalendarDaysRequest, isOpen: boolean) =>
  useQuery({
    queryKey: calendarQueryKeys.fetchCalendarDays(params).queryKey,
    queryFn: () => fetchCalendarDays(params),
    enabled: !!params.month && !!params.year && isOpen,
  });
