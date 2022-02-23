import { MenuIconButton } from "./MenuIconButton";
import { MoreVert } from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useDeleteAllItemsMutation, useDeleteCheckedMutation } from "../../../slices/api/api.slice";

export const MenuMoreOptionsButton = () => {
    const [deleteAllItems] = useDeleteAllItemsMutation();
    const [deleteCheckedItems] = useDeleteCheckedMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleDeleteAllItems = () => {
        setAnchorEl(null);
        deleteAllItems();
    };

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
