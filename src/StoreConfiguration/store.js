import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducers";
import storage from "./customStorage"; // Corrected storage implementation

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["register"], // State that will not be persisted
  timeout: 10000, // Optional: Increase timeout if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable state check for redux-persist
      }),
  });
}

export function persistAppStore(store) {
  return persistStore(store);
}
