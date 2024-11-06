import { createSlice } from "@reduxjs/toolkit";
import { createBoardThunk } from "../boards/operations.js"; // Імпортуйте вашу санку

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const boardsReducer = boardsSlice.reducer;
