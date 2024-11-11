import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchCardsThunk } from "./operations.js";
import { selectPriorityFilter } from "../filters/selectors.js";
import { selectAllCards } from "./selectors.js";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    error: null,
    refresh: false,
    loading: false,
  },
  reducers: {
    resetRefresh: (state) => {
      state.refresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Добавляем только новые карточки, если они не существуют
        const newCards = action.payload.filter(
          (newCard) => !state.cards.some((card) => card._id === newCard._id)
        );
        state.cards = [...state.cards, ...newCards];
      })
      .addCase(fetchCardsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectFilteredCards = createSelector(
  [selectAllCards, selectPriorityFilter],
  (cards, priority) => {
    if (!priority) {
      return cards;
    }
    return cards.filter(
      (card) => card.priority.toLowerCase() === priority.toLowerCase()
    );
  }
);

export const { resetRefresh } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
