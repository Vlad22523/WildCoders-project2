import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addCardThunk,
  deleteCardThunk,
  editCardThunk,
  fetchCardsThunk,
} from "./operations.js";
import toast from "react-hot-toast";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    error: null,
    refresh: false,
    loading: false,
  },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newCards = action.payload.filter(
          (newCard) => !state.cards.some((card) => card._id === newCard._id)
        );
        state.cards = [...state.cards, ...newCards];
      })
      .addCase(addCardThunk.fulfilled, (state, action) => {
        state.cards.push(action.payload.data);
        state.loading = false;
        toast("Card added to your list.", {
          icon: "✔️",
        });
      })
      .addCase(editCardThunk.fulfilled, (state, action) => {
        const index = state.cards.findIndex(
          (card) => card._id === action.payload.data._id
        );

        if (index !== -1) {
          state.cards[index] = action.payload.data;
        }
        state.loading = false;
        toast("Card edited.", {
          icon: "✔️",
        });
      })
      .addCase(deleteCardThunk.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card._id !== action.payload);
        state.loading = false;
        toast("Card removed from your list.", {
          icon: "🗑️",
        });
      })
      .addMatcher(
        isAnyOf(
          fetchCardsThunk.pending,
          addCardThunk.pending,
          deleteCardThunk.pending,
          editCardThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCardsThunk.rejected,
          addCardThunk.rejected,
          deleteCardThunk.rejected,
          editCardThunk.rejected
        ),
        (state, action) => {
          state.loading = true;
          state.error = action.error.message;
        }
      );
  },
});

export const { setCards } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
