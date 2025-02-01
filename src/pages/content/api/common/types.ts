export interface SearchList<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  lastPage: number;
}
