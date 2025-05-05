export interface ICommonResponse<T = undefined> {
  status: number;
  count?: number;
  data: T;
  code?: string;
  message?: string;
}

export interface SearchList<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  lastPage: number;
}
