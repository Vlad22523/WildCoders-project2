import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
<<<<<<< HEAD
=======
  saveThemeThunk,
>>>>>>> master
} from "./operations.js";

const initialState = {
  isRefreshing: false,
  isLoggedIn: false,
  token: null,
  loader: false,
  user: {},
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
      })
<<<<<<< HEAD
      .addCase(fetchUserThunk.pending, (state, action) => {
        state.user = action.payload;
=======
      .addCase(fetchUserThunk.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loader = false;
        document.documentElement.setAttribute(
          "data-theme",
          action.payload.theme
        );
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.user = action.payload;
        state.loader = false;
      })
      .addCase(saveThemeThunk.rejected, (state) => {
        state.loader = false;
      })
      .addCase(saveThemeThunk.pending, (state) => {
        state.loader = true;
      })
      .addCase(saveThemeThunk.fulfilled, (state) => {
        state.loader = false;
>>>>>>> master
      });
  },
});

export const authReducer = slice.reducer;
