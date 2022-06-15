import List from "@mui/material/List";
import React from "react";
import { ShoppingListLink } from "./ListItems/ShoppingListLink";
import { SettingsLink } from "./ListItems/SettingsLink";

/**
 * Functional Component. <br/>
 *
 * Shows two links in the sidebar. These links lead to the main and settings page respectively.
 *
 * @constructor
 */
export const SwipeableDrawerContent = (): JSX.Element => (
    <List>
        <ShoppingListLink />
        <SettingsLink />
    </List>
);
