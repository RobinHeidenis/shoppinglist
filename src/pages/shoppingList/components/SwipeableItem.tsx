import { Item, status } from "../../../interfaces/item";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import SwipeableListItem from "../../../components/lib/SwipeableListItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useCheckItemMutation, useDeleteItemMutation, useUncheckItemMutation } from "../../../slices/api/api.slice";
import { ItemLinkIcon } from "./ItemLinkIcon";

interface SwipeableListItemProps {
    item: Item;
    isDisabled: boolean;
    openEditDialog: (item: Item) => void;
}

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
    })
);

/**
 * Functional Component.
 *
 * Returns a swipe-able item which shows the current item name, amount, and a link icon if a link is present on the item object.
 * Allows the user to swipe right, marking it as done (or undone if status is already done).
 * Allows the user to swipe left, deleting the item.
 * These changes are immediately sent to the server through {@link shoppingListApi RTK Query}
 *
 * @param item - The item shown in this list item.
 * @param isDisabled - Whether this list item is currently being dragged. This prop disables the swiping on the item.
 * @param openEditDialog - A function to open the edit dialog with this item.
 * @constructor
 */
export const SwipeableItem = ({ item, isDisabled, openEditDialog }: SwipeableListItemProps) => {
    const classes = useStyles();
    const [deleteItem] = useDeleteItemMutation();
    const [checkItem] = useCheckItemMutation();
    const [uncheckItem] = useUncheckItemMutation();

    const backgroundStyles = {
        actionIconRight: item.status === status.open ? <DoneIcon /> : <UndoIcon />,
        backgroundColorRight: item.status === status.open ? "#008000" : "orange",
        actionIconLeft: <DeleteIcon />,
        backgroundColorLeft: "red",
    };

    const listItemTextProps = {
        primaryTypographyProps: {
            className: classes.itemDone,
        },
        secondaryTypographyProps: {
            className: classes.itemDone,
        },
    };

    return (
        <SwipeableListItem
            key={item.id}
            disabled={isDisabled}
            onClickEventHandler={() => {
                openEditDialog(item);
            }}
            background={backgroundStyles}
            onSwipedRight={() => (item.status === status.open ? checkItem(item.id) : uncheckItem(item.id))}
            onSwipedLeft={() => item.id && deleteItem(item.id)}
            primaryText={item.name}
            secondaryText={item.quantity}
            itemIcon={<ItemLinkIcon item={item} />}
            ListItemTextProps={item.status === status.closed && listItemTextProps}
        />
    );
};
