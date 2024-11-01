import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const slice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = slice.actions;
export const sidebarReducer = slice.reducer;
