import { Item } from "../../interfaces/item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StandardItemsState {
    standardItems: Item[];
}

const initialState: StandardItemsState = {
    standardItems: [],
};

export const standardItemsSlice = createSlice({
    name: "standardItems",
    initialState,
    reducers: {
        addStandardItem: (state, action: PayloadAction<Item>) => {
            state.standardItems.push(action.payload);
        },
        removeStandardItem: (state, action: PayloadAction<number>) => {
            const index = state.standardItems.findIndex((item) => item.id === action.payload);
            if (index === -1) return;
            state.standardItems.splice(index, 1);
        },
        setStandardItems: (state, action: PayloadAction<Item[]>) => {
            state.standardItems = action.payload;
        },
    },
});

export const { addStandardItem, removeStandardItem, setStandardItems } = standardItemsSlice.actions;

export default standardItemsSlice.reducer;
