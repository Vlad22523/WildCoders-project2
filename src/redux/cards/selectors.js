export const selectAllCards = (state) => state.cards.cards;
export const selectRefreshCards = (state) => state.cards.refresh;
export const selectLoadingCards = (state) => state.cards.loading;

export const selectCardsByColumn = (state, columnId) => {
  return state.cards.cards.filter((card) => card.columnId === columnId); // Используем columnId для фильтрации
};
