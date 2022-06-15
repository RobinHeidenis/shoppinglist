import { IconButton, ListItemSecondaryAction } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useAddItemMutation } from "../../../../../../slices/api/api.slice";
import { UnsubmittedItem } from "../../../../../../interfaces/item";
import { StandardItem } from "../../../../../../interfaces/standardItem";
import { UrlIconButton } from "./UrlIconButton";

interface SecondaryActionProps {
    item: StandardItem;
}

/**
 * Functional Component
 *
 * Returns the secondary action of the standard list item.
 *
 * If the item has an url, the component shows a {@link UrlIconButton link icon button}
 *
 * On click the button adds the standard item to the shopping list through {@link shoppingListApi RTK Query}
 * and changes the icon shown to a {@link CheckIcon}
 * @param item
 * @constructor
 */
export const SecondaryAction = ({ item }: SecondaryActionProps): JSX.Element => {
    const [addItem] = useAddItemMutation();
    const [checked, setChecked] = useState(false);

    /**
     * Creates a new item, based on the {@link item} prop passed to the component. </br>
     * Then submits the item using {@link shoppingListApi RTK Query} </br>
     * Afterwards it sets the checked boolean to true, changing the icon to a {@link CheckIcon Check} icon
     */
    const addItemToList = (): void => {
        const newItem: Partial<UnsubmittedItem> = {
            name: item.name,
            categoryId: 1,
            quantity: item.quantity ?? undefined,
            url: item.url ?? undefined,
        };
        void addItem(newItem).then(() => {
            setChecked(true);
        });
    };

    return (
        <ListItemSecondaryAction>
            {item.url && <UrlIconButton url={item.url} />}
            <IconButton onClick={addItemToList} size="large">
                {checked ? <CheckIcon /> : <AddIcon />}
            </IconButton>
        </ListItemSecondaryAction>
    );
};
