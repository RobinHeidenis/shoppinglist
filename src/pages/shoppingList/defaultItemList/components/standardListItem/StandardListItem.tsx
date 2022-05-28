import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { StandardItem } from "../../../../../interfaces/standardItem";
import { DeleteIconButton } from "./components/DeleteIconButton";
import { SecondaryAction } from "./components/SecondaryAction";

interface DefaultListItemProps {
    openDeleteConfirmation: (id: number) => void;
    item: StandardItem;
}

const useStyles = makeStyles(() =>
    createStyles({
        wordBreak: {
            wordBreak: "break-word",
        },
    }),
);

/**
 * Functional Component
 *
 * Returns a standard list item, with a {@link DeleteIconButton}, primary text, and {@link SecondaryAction}.
 * @param openDeleteConfirmation - Function to open the "delete confirmation" modal.
 * @param item
 * @constructor
 */
export const StandardListItem = ({ openDeleteConfirmation, item }: DefaultListItemProps): JSX.Element => {
    const classes = useStyles();

    return (
        <ListItem>
            <DeleteIconButton openDeleteConfirmation={openDeleteConfirmation} itemId={item.id} />
            <ListItemText primary={item.name} secondary={item.quantity} className={classes.wordBreak} />
            <SecondaryAction item={item} />
        </ListItem>
    );
};
