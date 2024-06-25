import { ISearchList } from './common.types';

export type WorkState = 'IN_PROGRESS' | 'COMPLETED';
export type WorkCategory = 'REFACTOR' | 'UPDATE' | 'CHORE' | 'FEAT';

export interface IFetchWorkListRequest {
  // startDate?: string;
  // endDate?: string;
  date?: string;
}

export interface IAddWorkRequest {
  title: string;
  content: string;
  date: string;
  category: WorkCategory;
  deadline?: string;
}

export interface IDeleteWorkRequest {
  id: number;
}

export interface IUpdateWorkCategoryRequest {
  category: WorkCategory;
  id: number;
}

export interface IUpdateWorkStateRequest {
  state: WorkState;
  id: number;
}

export interface IUpdateWorkContentRequest {
  content: string;
  id: number;
}

export interface IUpdateWorkOrderRequest {
  order: number;
  id: number;
}

export interface IWork {
  id: number;
  title: string;
  content: string;
  date: string;
  category: WorkCategory;
  state: WorkState;
  order: number;
  deadline: string | null;
}

export interface ISearchWorkList extends ISearchList<IWork> {}
