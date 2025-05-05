import { SearchList } from '~/shared/types';

export type WorkState = 'IN_PROGRESS' | 'COMPLETED';
export type WorkCategory = 'REFACTOR' | 'UPDATE' | 'CHORE' | 'FEAT';

export interface Work {
  id: number;
  title: string;
  content: string;
  date: string;
  category: WorkCategory;
  state: WorkState;
  order: number;
  deadline: string | null;
}

export interface FetchWorkListRequest {
  // startDate?: string;
  // endDate?: string;
  date?: string;
}

export interface SearchWorkList extends SearchList<Work> {}

export const WorkCategoryOptions: Array<WorkCategory> = ['CHORE', 'FEAT', 'REFACTOR', 'UPDATE'];
