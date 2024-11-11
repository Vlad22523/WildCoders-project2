import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddColumn,
  fetchColumnsThunk,
  fetchDeleteColumn,
} from "./operations.js";

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
    resetRefreshColumn: (state) => {
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
        state.refresh = true;
      })
      .addCase(fetchAddColumn.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddColumn.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeleteColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeleteColumn.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDeleteColumn.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetRefreshColumn } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
