import { createSlice } from "@reduxjs/toolkit";

const initState = { books: null };

const bookSlice = createSlice({
  name: "book",
  initialState: initState,
  reducers: {},
});

export default bookSlice.reducer;
