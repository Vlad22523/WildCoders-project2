import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHelpModalOpen: false,
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
});

export const { openHelpModal, closeHelpModal } = slice.actions;
export const helpModalReducer = slice.reducer;
