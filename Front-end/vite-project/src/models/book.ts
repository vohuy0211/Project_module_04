import axiosClient from '../api/axiosClient';
import { IBookAPI } from '../types/book';

export class BookAPI {
  static async getAllBooks(): Promise<Array<IBookAPI>> {
    const url: string = "api/v1/book/getBook";
    return axiosClient.get(url)
  }
  static getBookId(id: number) {
    const url: string = `api/v1/book/getBook/${id}`;
    console.log("Đường dẫn", url);
    return axiosClient.get(url);
  }
}