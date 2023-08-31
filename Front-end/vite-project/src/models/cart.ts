import axiosClient from '../api/axiosClient';

export class CartAPI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async addToCart(data: any): Promise<any> {
    const url = "api/v1/oderItem/postOderItem";
    return axiosClient.post(url, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async addOder(data: any) {
    const url: string = "api/v1/oder/postOder";
    return axiosClient.post(url, data);
  }
  static async getOder(id: number) {
    const url: string = `api/v1/oder/${id}`;
    return axiosClient.get(url);
  }
  static async getToCart(id: number) {
    const url = `api/v1/oderItem/${id}`;
    return axiosClient.get(url);
  }
  static async updateCart(id: number, newQuantity: number) {
    const url = `api/v1/oderItem/${id}`;
    return axiosClient.patch(url, { quantity: newQuantity });
  }
  static async deleteCart(id: number) {
    const url = `api/v1/oderItem/ById/${id}`;
    return axiosClient.delete(url);
  }
  static async searchBook(searchTerm: string) {
    const url = `api/v1/book/searchBook/${searchTerm}`;
    return axiosClient.get(url);
  }
  static async postHistory(data: string) {
    const url = "api/v1/history/postHistory";
    return axiosClient.post(url, data);
  }
  static async DelOderItem(id: number) {
    const url = `api/v1/oderItem/${id}`;
    return axiosClient.delete(url);
  }
  static async getHistory(id: number) {
    const url = `api/v1/history/getHistory/${id}`;
    console.log(url);
    return axiosClient.get(url);
  }
}