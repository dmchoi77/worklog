import { SearchList } from '../common/types';

export interface AddMemoRequest {
  content: string;
  date: string;
}

export interface DeleteMemoRequest {
  id: number;
}

export interface UpdateMemoRequest {
  id: number;
  content: string;
}

export interface UpdateMemoOrderRequest {
  id: number;
  order: number;
}

export interface FetchMemosRequest {
  // startDate?: string;
  // endDate?: string;
  date?: string;
}

export interface Memo {
  id: number;
  content: string;
  date: string;
  displayOrder: number;
}

export interface SearchMemoList extends SearchList<Memo> {}
