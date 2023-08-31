import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILogin, ILoginUser, IRegister, Login, Register } from '../../../models/User';

export const handleLogin = createAsyncThunk(
  "user/loginUser",
  async (inputValue: ILogin) => {
    console.log("payload", inputValue);
    const response: ILoginUser = await Login.LoginUser(inputValue);
    console.log("hahahah ==>", response.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("token", response.data.accessToken);
    return response;
  }
);

export const handleRegister = createAsyncThunk(
  "user/registerUser",
  async (inputValue: IRegister) => {
    console.log("payload", inputValue);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await Register.RegisterUser(inputValue);
    console.log("hehehehe= =>", response.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("token", response.data.accessToken);
    return response;
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    isLoggedIn: false,
    token: "",
    error: false,
  },
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [handleLogin.fulfilled as any]: (state: any, action: PayloadAction<ILoginUser>) => {
      state.data = action.payload?.data?.data;
      state.token = action.payload?.data?.accessToken;
      state.isLoggedIn = true;
    },
  },
});


export default userSlice.reducer;