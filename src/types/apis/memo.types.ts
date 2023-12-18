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

export interface IFetchMemosRequest {
  startDate?: string;
  endDate?: string;
}

export interface IMemo {
  id: number;
  content: string;
  date: string;
}
