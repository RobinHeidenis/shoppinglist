import { configureStore } from "@reduxjs/toolkit";
import { shoppinglistApi } from "../slices/api/api.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "../slices/auth/auth.slice";
import { rtkQueryErrorLogger } from "./middleware/error.middleware";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";

const persistConfig = {
    key: "auth",
    version: 1,
    storage,
    blacklist: [shoppinglistApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
    reducer: {
        [shoppinglistApi.reducerPath]: shoppinglistApi.reducer,
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(shoppinglistApi.middleware, rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

// const??????????????????????????
export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
