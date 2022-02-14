import { configureStore } from "@reduxjs/toolkit";
import standardItemsReducer from "../slices/standardItems/standardItems.slice";
import { shoppinglistApi } from "../slices/api/api.slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [shoppinglistApi.reducerPath]: shoppinglistApi.reducer,
        standardItems: standardItemsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shoppinglistApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
