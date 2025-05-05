import { SearchList } from '~/shared/types';

export interface Memo {
  id: number;
  content: string;
  date: string;
  displayOrder: number;
}

export interface FetchMemosRequest {
  // startDate?: string;
  // endDate?: string;
  date?: string;
}

export interface SearchMemoList extends SearchList<Memo> {}
