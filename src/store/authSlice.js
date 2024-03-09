import { createSlice } from "@reduxjs/toolkit";

const initState = { isLoggedIn: false, name: "Ahmed" };

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    toggleAuth: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { toggleAuth } = authSlice.actions;
export default authSlice.reducer;
