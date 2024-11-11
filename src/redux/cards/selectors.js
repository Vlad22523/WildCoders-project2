import { createSelector } from "@reduxjs/toolkit";
import { selectPriorityFilter } from "../filters/selectors.js";

export const selectAllCards = (state) => state.cards.cards;
export const selectRefreshCards = (state) => state.cards.refresh;
export const selectLoadingCards = (state) => state.cards.loading;
export const selectDeletedCard = (state) => state.cards.deleted;

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

export const selectCardsForColumn = (state, columnId) => {
  return state.cards.cards.filter((card) => card.columnId === columnId);
};
