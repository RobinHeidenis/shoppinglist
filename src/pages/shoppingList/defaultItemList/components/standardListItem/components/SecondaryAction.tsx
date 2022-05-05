import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
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
 * On click the button adds the standard item to the shopping list through {@link shoppinglistApi RTK Query}
 * and changes the icon shown to a {@link CheckIcon}
 * @param item
 * @constructor
 */
export const SecondaryAction = ({ item }: SecondaryActionProps) => {
    const [addItem] = useAddItemMutation();
    const [checked, setChecked] = useState(false);

    const addItemToList = () => {
        const newItem: Partial<UnsubmittedItem> = {
            name: item.name,
            categoryId: 1,
            quantity: item.quantity ?? undefined,
            url: item.url ?? undefined,
        };
        addItem(newItem).then(() => setChecked(true));
    };

    return (
        <ListItemSecondaryAction>
            {item.url && <UrlIconButton url={item.url} />}
            <IconButton onClick={addItemToList}>{checked ? <CheckIcon /> : <AddIcon />}</IconButton>
        </ListItemSecondaryAction>
    );
};
