import history from "../lib/history";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React, { useContext } from "react";
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
export const MenuLink = ({ listKey, location, icon, text }: MenuLinkProps) => {
    const { setIsDrawerOpen } = useContext(SideBarContext);

    return (
        <ListItem
            button
            key={listKey}
            onClick={() => {
                history.push(location);
                setIsDrawerOpen(false);
            }}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};
