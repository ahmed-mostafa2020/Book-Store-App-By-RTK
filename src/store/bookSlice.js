import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getBooks = createAsyncThunk("book/getBooks", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3005/book");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initState = { books: null };

const bookSlice = createSlice({
  name: "book",
  initialState: initState,
  reducers: {},
});

export default bookSlice.reducer;
