import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action has 3 response types

// Get Data
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

// Insert Data
export const insertBooks = createAsyncThunk(
  "book/insertBooks",
  async (bookData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3005/book", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
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
      // Get Data
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
      })

      // Insert Data
      .addCase(insertBooks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(insertBooks.fulfilled, (state, action) => {
        state.isLoading = false;

        state.books.push(action.payload);
      })
      .addCase(insertBooks.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload; // action.payload = Failed to fetch
      });
  },
});

export default bookSlice.reducer;
