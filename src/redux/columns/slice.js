import { createSlice } from "@reduxjs/toolkit";
import { fetchColumnsThunk } from "./operations.js";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    columns: [],
    error: null,
    refresh: false,
    loading: false,
    loadedColumns: false,
  },
  reducers: {
    resetRefresh: (state) => {
      state.refresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumnsThunk.pending, (state) => {
        state.loading = true;
        state.loadedColumns = false;
        state.error = null;
      })
      .addCase(fetchColumnsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.columns = action.payload;
        state.loadedColumns = true;
      })
      .addCase(fetchColumnsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loadedColumns = false;
      });
  },
});

export const { resetRefresh } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
