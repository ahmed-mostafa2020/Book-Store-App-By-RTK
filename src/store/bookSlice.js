import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action has 3 response types
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3005/book");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initState = { books: null };

const bookSlice = createSlice({
  name: "book",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        console.log(action);
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(getBooks.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default bookSlice.reducer;
