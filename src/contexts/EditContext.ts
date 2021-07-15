import { createContext } from "react";
import { Item } from "../interfaces/item";

export interface EditContextSchema {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    editingItem: Item;
    setEditingItem: (item: Item) => void;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (isEditDialogOpen: boolean) => void;
}

export const EditContext = createContext<EditContextSchema>({
    isEditing: false,
    setIsEditing: () => undefined,
    editingItem: {
        id: 0,
        name: "",
        quantity: "",
        url: "",
        status: 0,
    } as Item,
    setEditingItem: () => undefined,
    isEditDialogOpen: false,
    setIsEditDialogOpen: () => undefined,
});
