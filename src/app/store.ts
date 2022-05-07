import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
import { rtkQueryErrorLogger } from "./middleware/error.middleware";
import { authSlice } from "../slices/auth/auth.slice";
import { shoppingListApi } from "../slices/api/api.slice";

const persistConfig = {
    key: "auth",
    version: 1,
    storage,
    blacklist: [shoppingListApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
    reducer: {
        [shoppingListApi.reducerPath]: shoppingListApi.reducer,
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(shoppingListApi.middleware, rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
