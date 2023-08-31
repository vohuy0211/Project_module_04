import axios from 'axios';

import axiosClient from '../api/axiosClient';

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  id: number;
  email: string,
  username: string,
  password: string,
  confirmPassword?: string | undefined;
  phoneNumber: number,
  address: string,
  role: number,
  status: number
}

export interface ILoginUser {
  data: {
    data: {
      id: number;
      email: string;
      username: string;
      password: string;
      phoneNumber: number;
      address: string;
      role: number;
      status: number;
      createdAt: string;
      updatedAt: string;
    },
    accessToken: string;
  },
}

export class Login {
  static async LoginUser(params: ILogin): Promise<ILoginUser> {
    const url: string = "http://localhost:8000/api/v1/user/login";
    const response = await axios.post(url, params, {
      withCredentials: true,
    });
    return response;
  }
  static async getUserById(id: number) {
    const url: string = `api/v1/user/get-user/${id}`;
    return axiosClient.get(url)
  }
  static async EditUser(id: number, data: IRegister): Promise<void> {
    const url: string = `api/v1/user/patch-user-admin/${id}`;
    return axiosClient.patch(url, data);
  }
}

export class Register {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async RegisterUser(params: IRegister): Promise<any> {
    const url: string = "http://localhost:8000/api/v1/user/register";
    const response = await axios.post(url, params);
    return response;
  }
}
