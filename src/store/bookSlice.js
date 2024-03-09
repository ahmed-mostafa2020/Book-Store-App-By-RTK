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

const initState = { books: null, isLoading: false };

const bookSlice = createSlice({
  name: "book",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
        console.log(action);
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log(action);
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;

        console.log(action);
      });
  },
});

export default bookSlice.reducer;
