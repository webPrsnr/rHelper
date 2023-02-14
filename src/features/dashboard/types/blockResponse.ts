export interface SingleBlock {
  column_id: string;
  user_id: string;
  column_title: string;
  column_index: number;
}

export interface BlockResponse {
  columns: SingleBlock[];
}
