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
