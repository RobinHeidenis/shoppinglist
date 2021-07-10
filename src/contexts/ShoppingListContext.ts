import { createContext, Dispatch, SetStateAction } from "react";
import { Item } from "../interfaces/item";

export interface ShoppingListContextType {
    items: Item[];
    setItems: Dispatch<SetStateAction<Item[]>>;
}

export const ShoppingListContext = createContext<ShoppingListContextType>({
    items: [],
    setItems: (v: SetStateAction<Item[]>) => [],
});
