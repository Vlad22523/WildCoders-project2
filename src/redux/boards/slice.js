import { createSlice } from "@reduxjs/toolkit";
import {
   getBoardsThunk ,
  createBoardThunk,
  deleteBoardThunk,
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

        state.error = action.payload;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board._id !== action.payload
        );
      })
      .addCase(deleteBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = state.boards.map((board) =>
          board.id === action.payload.id ? action.payload : board
        );
      })
      .addCase(updateBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
