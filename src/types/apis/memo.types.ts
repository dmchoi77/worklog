import { ISearchList } from './common.types';

export interface IAddMemoRequest {
  content: string;
  date: string;
}

export interface IDeleteMemoRequest {
  id: number;
}

export interface IUpdateMemoRequest {
  id: number;
  content: string;
}

export interface IUpdateMemoOrderRequest {
  id: number;
  order: number;
}

export interface IFetchMemosRequest {
  // startDate?: string;
  // endDate?: string;
  date?: string;
}

export interface IMemo {
  id: number;
  content: string;
  date: string;
  displayOrder: number;
}

export interface ISearchMemoList extends ISearchList<IMemo> {}
