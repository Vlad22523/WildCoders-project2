import { createSlice } from "@reduxjs/toolkit";
import { submitHelpThunk } from "./operations.js";

const initialState = {
  isHelpModalOpen: false,
  isLoading: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: "helpModal",
  initialState,
  reducers: {
    openHelpModal: (state) => {
      state.isHelpModalOpen = true;
    },
    closeHelpModal: (state) => {
      state.isHelpModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitHelpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitHelpThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(submitHelpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { openHelpModal, closeHelpModal } = slice.actions;
export const helpModalReducer = slice.reducer;
