export interface ICommonAPIResponse<T> {
  data: T;
}

export interface IMenuListResponse {
  year: string;
  months: { month: string; days: string[] }[];
}
