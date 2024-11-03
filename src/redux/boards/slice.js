import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "boards",
  initialState: [],
  reducers: {
    addBoard: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
