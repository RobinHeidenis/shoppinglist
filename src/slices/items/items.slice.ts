import { Item, status } from "../../interfaces/item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ItemsState {
    items: Item[];
}

const initialState: ItemsState = {
    items: [],
};

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex((item) => item.id === action.payload);
            if (index === -1) return;
            state.items.splice(index, 1);
        },
        setItems: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        },
        updateItemStatus: (state, action: PayloadAction<{ id: number; status: status }>) => {
            const item = state.items.find((stateItem) => stateItem.id === action.payload.id);
            if (!item) return;
            item.status = action.payload.status;
        },
        removeAllItems: (state) => {
            state.items = [];
        },
    },
});

// export const { addItem, removeItem, setItems, updateItemStatus, removeAllItems } = itemsSlice.actions;

export default itemsSlice.reducer;
