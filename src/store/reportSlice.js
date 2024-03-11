import { createSlice } from "@reduxjs/toolkit";

const initState = { logs: [] };

const reportSlice = createSlice({
  name: "report",
  initialState: initState,
  reducers: {
    logInsert: (state, action) => {
      state.logs.push(action.payload);
    },
  },
});

export const { logInsert } = reportSlice.actions;

export default reportSlice.reducer;
