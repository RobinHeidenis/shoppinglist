import { ItemsState } from "./items.slice";
import { Item } from "../../interfaces/item";

export const selectItems = (state: ItemsState): Item[] => state.items;
