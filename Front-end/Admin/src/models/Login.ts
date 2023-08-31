import axios from 'axios';

export interface ILogin {
  email: string;
  password: string;
}

export interface IAdminLogin {
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
  static async LoginAdmin(params: ILogin): Promise<IAdminLogin> {
    const url: string = "http://localhost:8000/api/v1/user/login";
    const response = await axios.post(url, params);
    return response;
  }
}