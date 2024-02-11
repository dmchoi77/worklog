export interface ICommonResponse<T = undefined> {
  status: number;
  count?: number;
  data: T;
  code?: string;
  message?: string;
}

export interface ISearcList<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  lastPage: number;
}
