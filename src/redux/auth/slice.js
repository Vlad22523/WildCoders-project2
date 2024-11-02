import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk } from "./operations.js";

const initialState = {
  isRefreshing: false,
  isLoggedIn: false,
  token: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.token = action.payload.user.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const authReducer = slice.reducer;
