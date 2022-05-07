import { IconButton } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Item, Status } from "../../../interfaces/item";

/**
 * Styles
 *
 * Returns the styles for the {@link SwipeableItem} component.
 *
 * Is used to set the opacity and strike through values for a done item,
 * or full opacity for a not done item.
 * Provides a class for setting opacity zero for a non-existent link, to keep the spacing consistent.
 */
export const useStyles = makeStyles(() =>
    createStyles({
        opacityZero: {
            opacity: "0%",
        },
        itemDone: {
            opacity: "30%",
            textDecoration: "line-through",
        },
        itemNotDone: {
            opacity: "100%",
        },
    }),
);

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
export const ItemLinkIcon = ({ item }: { item: Item }): JSX.Element => {
    const classes = useStyles();

    let className = classes.opacityZero;

    if (item.url) {
        if (item.status === Status.closed) className = classes.itemDone;
        else className = classes.itemNotDone;
    }

    return (
        <IconButton
            disabled={!item.url}
            aria-label="link to product on ah.nl"
            onClick={(e): void => {
                e.stopPropagation();
                window.open(item.url);
            }}
            className={className}
        >
            <LinkIcon />
        </IconButton>
    );
};
