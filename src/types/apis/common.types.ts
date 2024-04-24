export interface ICommonResponse<T = undefined> {
  status: number;
  count?: number;
  data: T;
  code?: string;
  message?: string;
}

export interface ISearchList<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  lastPage: number;
}
