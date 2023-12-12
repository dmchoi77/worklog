export interface IAddMemoRequest {
  content: string;
  date: string;
}

export interface IDeleteMemoRequest {
  id: number;
  content: string;
  date: string;
  username: string;
}

export interface IUpdateMemoRequest {
  id: number;
  content: string;
  date: string;
}
