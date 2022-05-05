import { MenuIconButton } from "./MenuIconButton";
import { MoreVert } from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
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
export const MenuMoreOptionsButton = () => {
    const [deleteAllItems] = useDeleteAllItemsMutation();
    const [deleteCheckedItems] = useDeleteCheckedMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    /**
     * The onClick handler for the "delete all items" option.
     * Closes the menu and updates the backend. <br/>
     *
     * Uses {@link shoppingListApi RTK Query} to update the backend.
     */
    const handleDeleteAllItems = () => {
        setAnchorEl(null);
        deleteAllItems();
    };

    /**
     * The onClick handler for the "delete checked items" option.
     * Closes the menu and updates the backend. <br/>
     *
     * Uses {@link shoppingListApi RTK Query} to update the backend.
     */
    const handleDeleteCheckedItems = () => {
        setAnchorEl(null);
        deleteCheckedItems();
    };

    return (
        <div>
            <MenuIconButton end label={"menu button"} onClick={(e) => setAnchorEl(e.currentTarget as HTMLElement)}>
                <MoreVert />
            </MenuIconButton>
            <Menu id="itemMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={handleDeleteCheckedItems}>Remove checked items</MenuItem>
                <MenuItem onClick={handleDeleteAllItems}>Remove all items</MenuItem>
            </Menu>
        </div>
    );
};
