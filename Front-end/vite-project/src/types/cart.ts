export interface ICart {
  book_id: number;
  oders_id: number;
  quantity: number;
  length: number;
}

export interface IHistory {
  price?: number;
  oderDate?: string;
  oders_id?: number;
  books_id?: number;
  quantity?: number;
  status?: number;
}