import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { MenuIconButton } from "./MenuIconButton";
import { useDeleteAllItemsMutation, useDeleteCheckedMutation } from "../../../slices/api/api.slice";

/**
 * Functional Component. <br/>
 *
 * Shows a "more options" button, which when clicked opens a menu.
 * This menu allows the user to delete all/checked items. <br/>
 *
 * Uses {@link shoppingListApi RTK Query} to update the backend.
 * @constructor
 */
export const MenuMoreOptionsButton = (): JSX.Element => {
    const [deleteAllItems] = useDeleteAllItemsMutation();
    const [deleteCheckedItems] = useDeleteCheckedMutation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    /**
     * The onClick handler for the "delete all items" option.
     * Closes the menu and updates the backend. <br/>
     *
     * Uses {@link shoppingListApi RTK Query} to update the backend.
     */
    const handleDeleteAllItems = (): void => {
        setAnchorEl(null);
        void deleteAllItems();
    };

    /**
     * The onClick handler for the "delete checked items" option.
     * Closes the menu and updates the backend. <br/>
     *
     * Uses {@link shoppingListApi RTK Query} to update the backend.
     */
    const handleDeleteCheckedItems = (): void => {
        setAnchorEl(null);
        void deleteCheckedItems();
    };

    return (
        <div>
            <MenuIconButton
                end
                label="menu button"
                onClick={(e): void => {
                    setAnchorEl(e.currentTarget as HTMLElement);
                }}
            >
                <MoreVert />
            </MenuIconButton>
            <Menu
                id="itemMenu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={(): void => {
                    setAnchorEl(null);
                }}
            >
                <MenuItem onClick={handleDeleteCheckedItems}>Remove checked items</MenuItem>
                <MenuItem onClick={handleDeleteAllItems}>Remove all items</MenuItem>
            </Menu>
        </div>
    );
};
