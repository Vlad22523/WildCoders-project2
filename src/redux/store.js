import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice.js";
import { sidebarReducer } from "./sidebar/slice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { boardsReducer } from "./boards/slice.js";
import { helpModalReducer } from "./needHelp/slice.js";
import { columnsReducer } from "./columns/slice.js";
import { cardsReducer } from "./cards/slice.js";
import { filtersReducer } from "./filters/slice.js";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loader"], // Виключаємо поле loader зі збереження
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    sidebar: sidebarReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    filters: filtersReducer,
    cards: cardsReducer,
    helpModal: helpModalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
