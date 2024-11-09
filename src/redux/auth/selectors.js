export const selectIsRefresh = (state) => state.auth.isRefreshing;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoader = (state) => state.auth.loader;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
