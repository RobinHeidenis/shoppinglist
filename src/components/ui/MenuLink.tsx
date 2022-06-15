import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import React, { useContext } from "react";
import history from "../lib/history";
import { SideBarContext } from "../../contexts/SideBarContext";

interface MenuLinkProps {
    listKey: string;
    location: string;
    icon: React.ReactNode;
    text: string;
}

/**
 * Functional Component.
 *
 * Renders a menu item with a specified text, icon, and redirect location.
 * Redirects the user and closes the sidebar on click. <br/>
 *
 * @param listKey - The key to be used for the list item.<br/>
 * @param location - The location the item should redirect to on click.<br/>
 * @param icon - The icon used for the list item.<br/>
 * @param text - The text displayed on the list item.<br/>
 * @constructor
 */
export const MenuLink = ({ listKey, location, icon, text }: MenuLinkProps): JSX.Element => {
    const { setIsDrawerOpen } = useContext(SideBarContext);

    return (
        <ListItem
            button
            key={listKey}
            onClick={(): void => {
                history.push(location);
                setIsDrawerOpen(false);
            }}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};
