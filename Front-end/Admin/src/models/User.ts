import axiosClient from '../api/axiosClient';
import { IAdminLogin } from './Login';

export class userAPI {
  static async getAllUsers(): Promise<Array<IAdminLogin>> {
    const url: string = "api/v1/user/get-user"
    return axiosClient.get(url)
  }
  static async editUser(id: number, newStatus: number): Promise<void> {
    const url: string = `api/v1/user/patch-user-admin/${id}`;
    return axiosClient.patch(url, { status: newStatus })
  }
  static async getUserById(id: number) {
    const url = `api/v1/user/get-user/${id}`;
    return axiosClient.get(url);
  }
  static async searchUser(searchTerm: string) {
    const url = `api/v1/user/searchUser/${searchTerm}`;
    return axiosClient.get(url);
  }
}

