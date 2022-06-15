import ListIcon from "@mui/icons-material/List";
import React from "react";
import { MenuLink } from "../../../ui/MenuLink";

/**
 * Functional Component. <br/>
 *
 * Renders the "Shopping list" link in the sidebar.
 * Redirects the user to the main page on click and closes the sidebar.
 *
 * @constructor
 */
export const ShoppingListLink = (): JSX.Element => <MenuLink listKey="List" location="/" icon={<ListIcon />} text="Shopping list" />;
