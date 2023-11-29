export interface ICommonResponse<T = undefined> {
  status: number;
  count?: number;
  data?: T;
  code?: string;
  message?: string;
}
