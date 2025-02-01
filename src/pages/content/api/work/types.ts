import { Work, WorkCategory, WorkState } from '../../model';
import { SearchList } from '../common/types';

export interface FetchWorkListRequest {
  // startDate?: string;
  // endDate?: string;
  date?: string;
}

export interface AddWorkRequest {
  title: string;
  content: string;
  date: string;
  category: WorkCategory;
  deadline?: string;
}

export interface DeleteWorkRequest {
  id: number;
}

export interface UpdateWorkCategoryRequest {
  category: WorkCategory;
  id: number;
}

export interface UpdateWorkStateRequest {
  state: WorkState;
  id: number;
}

export interface UpdateWorkContentRequest {
  content: string;
  id: number;
}

export interface UpdateWorkOrderRequest {
  order: number;
  id: number;
}

export interface SearchWorkList extends SearchList<Work> {}
