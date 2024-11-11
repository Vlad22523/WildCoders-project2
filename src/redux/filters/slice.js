import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  priority: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changePriorityFilter: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const { changePriorityFilter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
