import { createSlice } from "@reduxjs/toolkit";
import { getBoardsThunk } from "../boards/operations.js"; // Імпортуйте вашу санку

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    error: null,
    refresh: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsThunk.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.refresh = false;
        state.loading = false;
      })
      .addCase(getBoardsThunk.rejected, (state) => {
        state.refresh = true;
        state.loading = false;
      })
      .addCase(getBoardsThunk.pending, (state) => {
        state.loading = true;
      });
    // .addCase(createBoardThunk.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(createBoardThunk.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.boards.push(action.payload);
    // })
    // .addCase(createBoardThunk.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const boardsReducer = boardsSlice.reducer;
