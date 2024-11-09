export const selectAllBoards = (state) => state.boards.boards;
export const selectBoardById = (state, boardId) =>
  state.boards.boards.find((board) => board._id === boardId);
export const selectIsLoading = (state) => state.boards.isLoading;
export const selectError = (state) => state.boards.error;
