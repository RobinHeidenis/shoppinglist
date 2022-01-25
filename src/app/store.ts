import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../slices/items/items.slice";
import { shoppinglistApi } from "../slices/api/api.slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [shoppinglistApi.reducerPath]: shoppinglistApi.reducer,
        items: itemsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shoppinglistApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
