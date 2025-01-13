import { ICommonResponse } from './common.types';

export interface FetchCalendarDaysRequest {
  year: number;
  month: number;
}

export type CalendarYearsResponse = { years: number[] };
export type CalendarMonthsResponse = { months: number[] };
export type CalendarDaysResponse = { days: number[] };
