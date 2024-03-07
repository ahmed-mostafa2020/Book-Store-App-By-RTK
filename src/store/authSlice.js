import { createSlice } from "@reduxjs/toolkit";

const initState = { isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
});

export default authSlice.reducer;
