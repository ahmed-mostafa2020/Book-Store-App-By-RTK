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
      // To return an error (rejected not fulfilled)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initState = { books: [], isLoading: false, error: null };

const bookSlice = createSlice({
  name: "book",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;

        state.books = action.payload; // action.payload = Array
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload; // action.payload = Failed to fetch
      });
  },
});

export default bookSlice.reducer;
