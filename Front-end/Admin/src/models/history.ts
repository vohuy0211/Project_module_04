import axiosClient from '../api/axiosClient';

export class History {
  static async editHistory(id: number, newStatus: number): Promise<void> {
    const url: string = `api/v1/history/patchHistory/${id}`;
    return axiosClient.patch(url, { status: newStatus })
  }
  static async getHistoryById(id: number) {
    const url: string = `api/v1/history/getHistoryById/${id}`;
    return axiosClient.get(url)
  }
}