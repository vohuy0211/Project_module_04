import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAdminLogin, ILogin, Login } from '../../models/Login';

export const handleLogin = createAsyncThunk(
  "user/loginUser",
  async (inputValue : ILogin) => {
    console.log("payload", inputValue);
    const response:IAdminLogin = await Login.LoginAdmin(inputValue);
    console.log("hahahah ==>", response.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("token", response.data.accessToken);
    return response;
  }
);

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
    [handleLogin.fulfilled as any]: (state, action : PayloadAction<IAdminLogin>) => {
      state.data = action.payload?.data?.data;
      state.token = action.payload?.data?.accessToken;
      state.isLoggedIn = true;
    },
  },
});


export default userSlice.reducer;
