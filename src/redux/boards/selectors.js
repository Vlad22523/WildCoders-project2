
export const selectBoardById = (state, boardId) =>
  state.boards.boards.find((board) => board._id === boardId);
export const selectError = (state) => state.boards.error;
export const selectAllBoards = (state) => state.boards.boards;
export const selectRefresh = (state) => state.boards.refresh;
export const selectLoadingBoard = (state) => state.boards.loading;