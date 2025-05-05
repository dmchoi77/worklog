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
