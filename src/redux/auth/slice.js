import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk } from "./operations.js";

const initialState = {
  isRefreshing: false,
  isLoggedIn: false,
  token: null,
  loader: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.token = action.payload.user.accessToken;
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loader = false;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loader = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const authReducer = slice.reducer;
