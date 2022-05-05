import { IconButton, ListItemIcon } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

interface DeleteIconButtonProps {
    openDeleteConfirmation: (id: number) => void;
    itemId: number;
}

/**
 * Functional Component
 *
 * Returns an {@link IconButton} with a {@link DeleteIcon} as button icon.
 *
 * Opens a "delete confirmation" modal, asking the user if they really want to delete this item.
 *
 * @param openDeleteConfirmation - The function to open the "delete confirmation" modal
 * @param itemId - The ID of the item to be passed to the modal
 * @constructor
 */
export const DeleteIconButton = ({ openDeleteConfirmation, itemId }: DeleteIconButtonProps) => (
    <ListItemIcon>
        <IconButton onClick={() => openDeleteConfirmation(itemId)}>
            <DeleteIcon />
        </IconButton>
    </ListItemIcon>
);
