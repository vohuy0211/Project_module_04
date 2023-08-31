import axiosClient from '../api/axiosClient';
import { IBook, IEditBook } from '../types/typeBook';

export class BookAPI {
  static async getAllBook(): Promise<Array<IBook>> {
    const url: string = "api/v1/book/getBook";
    return axiosClient.get(url);
  }
  static async deleteId(id: number) {
    const url: string = `api/v1/book/deleteBook/${id}`;
    return axiosClient.delete(url);
  }
  static async searchBook(searchTerm: string) {
    const url: string = `api/v1/book/searchBook/${searchTerm}`;
    return axiosClient.get(url);
  }
  static async getBookById(id: number) {
    const url: string = `api/v1/book/getBook/${id}`;
    return axiosClient.get(url);
  }
  static async updateBook(id: number, data: IEditBook): Promise<void> {
    const url = `api/v1/book/patchBook/${id}`;
    return axiosClient.patch(url, data);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async postBook(data: IEditBook): Promise<Array<IEditBook>> {
    const url: string = "api/v1/book/postBook";
    return axiosClient.post(url, data);
  }
  static async getOder() {
    const url = "api/v1/history/getHistoryAll";
    return axiosClient.get(url);
  }
}