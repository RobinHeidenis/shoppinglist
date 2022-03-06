import { Item, status } from "../../../interfaces/item";
import { IconButton } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import React from "react";
import { useStyles } from "./SwipeableItem";

/**
 * Functional Component.
 *
 * Returns an {@link IconButton} which redirects the user to a link provided on the item prop.
 * If no link is present on the item prop, a disabled icon button with zero opacity is returned.
 * Will use the proper styles for a done and not done item.
 *
 * @param item - The item for which the item link is being generated
 * @constructor
 */
export const ItemLinkIcon = ({ item }: { item: Item }) => {
    const classes = useStyles();

    let className = classes.opacityZero;

    if (item.url) {
        if (item.status === status.closed) className = classes.itemDone;
        else className = classes.itemNotDone;
    }

    return (
        <IconButton
            disabled={!item.url}
            aria-label="link to product on ah.nl"
            onClick={(e) => {
                e.stopPropagation();
                window.open(item.url);
            }}
            className={className}
        >
            <LinkIcon />
        </IconButton>
    );
};
