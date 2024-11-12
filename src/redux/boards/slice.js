import { createSlice } from "@reduxjs/toolkit";
import {
  createBoardThunk,
  deleteBoardThunk,
  getBoardsThunk,
  updateBoardThunk,
} from "../boards/operations.js";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    error: null,
    refresh: false,
    loading: false,
  },
  reducers: {
    resetRefresh: (state) => {
      state.refresh = false;
    },
  },
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
      })
      .addCase(createBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.refresh = true;
        state.error = action.payload;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board._id !== action.payload
        );
        state.loading = false;
        state.refresh = false;
      })
      .addCase(deleteBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.refresh = true;
      })
      .addCase(updateBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.refresh = false;
        state.boards = state.boards.map((board) =>
          board.id === action.payload.id ? action.payload : board
        );
      })

      .addCase(updateBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.refresh = true;
      });
  },
});

export const { resetRefresh } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
