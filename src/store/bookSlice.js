import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";
// createAsyncThunk => Action has 3 response types

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
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    try {
      // To add userName to posted data
      bookData.userName = getState().auth.name;

      // delete specif item while insert new item with specif author
      const booksNumbers = getState().books.books;
      const userName = getState().auth.name;
      if (booksNumbers.length > 4 && userName === "Ahmed") {
        dispatch(deleteBooks(booksNumbers[4]));
      }

      const res = await fetch("http://localhost:3005/book", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();

      // dispatch action from action (create report)
      dispatch(
        logInsert({
          actionName: "insertBooks",
          bookName: bookData.title,
          status: "success",
        })
      );

      return data;
    } catch (error) {
      dispatch(logInsert({ name: "insertBooks", status: "failed" }));

      // To return an error (rejected not fulfilled)
      return rejectWithValue(error.message);
    }
  }
);

// Delete Data
export const deleteBooks = createAsyncThunk(
  "book/deleteBooks",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      await fetch(`http://localhost:3005/book/${item.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });

      return item;
    } catch (error) {
      // To return an error (rejected not fulfilled)
      return rejectWithValue(error.message);
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
        state.books = action.payload; // action.payload = Array of objects
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
        state.error = action.payload;
      })

      // Delete Data
      .addCase(deleteBooks.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((el) => el.id !== action.payload.id);
      })

      .addCase(deleteBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
