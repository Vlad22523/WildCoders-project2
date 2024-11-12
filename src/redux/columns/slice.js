import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddColumn,
  fetchColumnsThunk,
  fetchDeleteColumn,
  fetchPatchColumn,
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
        state.refresh = false;
      })
      .addCase(fetchColumnsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loadedColumns = false;
        state.refresh = true;
      })
      .addCase(fetchAddColumn.fulfilled, (state, action) => {
        state.columns.push(action.payload);
        state.loading = false;
        state.refresh = false;
      })
      .addCase(fetchAddColumn.rejected, (state) => {
        state.loading = false;
        state.refresh = true;
      })
      .addCase(fetchAddColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeleteColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeleteColumn.fulfilled, (state, action) => {
        state.columns = state.columns.filter(
          (item) => item._id !== action.payload
        );
        state.loading = false;
        state.refresh = false;
      })
      .addCase(fetchDeleteColumn.rejected, (state) => {
        state.loading = false;
        state.refresh = true;
      })
      .addCase(fetchPatchColumn.fulfilled, (state, action) => {
        const index = state.columns.findIndex(
          (card) => card._id === action.payload._id
        );

        if (index !== -1) {
          state.columns[index] = action.payload;
        }
        state.loading = false;
        state.refresh = false;
      })
      .addCase(fetchPatchColumn.rejected, (state) => {
        state.loading = false;
        state.refresh = true;
      })
      .addCase(fetchPatchColumn.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { resetRefreshColumn } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
