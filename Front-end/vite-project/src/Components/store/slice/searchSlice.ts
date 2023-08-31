import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    handleSearch: (state, action) => {
      console.log(state);

      return (state = action.payload);
    },
  },
});

const { actions, reducer } = searchSlice;
export const { handleSearch } = actions;
export default reducer;