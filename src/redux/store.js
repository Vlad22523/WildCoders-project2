import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice.js";
import { sidebarReducer } from "./sidebar/slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
  },
});
