import { createSlice } from "@reduxjs/toolkit";
import {
  createBoardThunk,
  deleteBoardThunk,
  updateBoardThunk,
} from "../boards/operations.js";

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
        const updatedBoard = action.payload;
        console.log("Payload from update:", action.payload);

        const index = state.boards.findIndex(
          (board) => board._id === updatedBoard._id
        );

        if (index !== -1) {
          // Оновлення стану, не змінюючи існуючі елементи безпосередньо
          state.boards = [
            ...state.boards.slice(0, index), // Залишити всі попередні елементи до цього індексу
            updatedBoard, // Додати оновлену дошку
            ...state.boards.slice(index + 1), // Залишити всі елементи після цього індексу
          ];

          console.log(
            "Updated boards in state:",
            JSON.parse(JSON.stringify(state.boards))
          );
        }
      })

      .addCase(updateBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const boardsReducer = boardsSlice.reducer;
