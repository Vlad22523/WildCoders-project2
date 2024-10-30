import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRefreshing: false,
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
});

export const authReducer = slice.reducer;
