import { ShoppingListLink } from "./ListItems/ShoppingListLink";
import { SettingsLink } from "./ListItems/SettingsLink";
import List from "@material-ui/core/List";
import React from "react";

/**
 * Functional Component. <br/>
 *
 * Shows two links in the sidebar. These links lead to the main and settings page respectively.
 *
 * @constructor
 */
export const SwipeableDrawerContent = () => (
    <List>
        <ShoppingListLink />
        <SettingsLink />
    </List>
);
