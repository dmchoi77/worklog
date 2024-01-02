export type WorkStateType = 'in_progress' | 'completed';
export type WorkCategoryType = 'refactor' | 'update' | 'chore' | 'feat';

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
