import { ISearchList } from './common.types';

export type WorkStateType = 'IN_PROGRESS' | 'COMPLETED';
export type WorkCategoryType = 'REFACTOR' | 'UPDATE' | 'CHORE' | 'FEAT';

export interface IFetchWorkListRequest {
  // startDate?: string;
  // endDate?: string;
  date?: string;
}

export interface IAddWorkRequest {
  title: string;
  content: string;
  date: string;
  category: WorkCategoryType;
  deadline?: string;
}

export interface IDeleteWorkRequest {
  id: number;
}

export interface IUpdateWorkCategoryRequest {
  category: WorkCategoryType;
  id: number;
}

export interface IUpdateWorkStateRequest {
  state: WorkStateType;
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
  category: WorkCategoryType;
  state: WorkStateType;
  order: number;
  deadline: string | null;
}

export interface ISearchWorkList extends ISearchList<IWork> {}
