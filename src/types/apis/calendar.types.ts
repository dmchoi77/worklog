export interface IFetchCalendarCommonResponse {
  years?: number[];
  months?: number[];
  days?: number[];
}

export interface IFetchCalendarDaysRequest {
  year: number;
  month: number;
}
