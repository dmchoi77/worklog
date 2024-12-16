import { ICommonResponse } from './common.types';

export interface FetchCalendarDaysRequest {
  year: number;
  month: number;
}

export type CalendarYearsResponse = ICommonResponse<{ years: number[] }>;
export type CalendarMonthsResponse = ICommonResponse<{ months: number[] }>;
export type CalendarDaysResponse = ICommonResponse<{ days: number[] }>;
