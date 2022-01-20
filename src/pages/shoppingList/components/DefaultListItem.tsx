import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Item } from "../../../interfaces/item";
import { createStyles, makeStyles } from "@material-ui/core/styles";

interface DefaultListItemProps {
    openDeleteConfirmation: (id: number) => void;
    addItemToItemList: (item: Item) => void;
    item: Item;
}

const useStyles = makeStyles(() =>
    createStyles({
        wordBreak: {
            wordBreak: "break-word",
        },
    })
);

export function DefaultListItem({ openDeleteConfirmation, addItemToItemList, item }: DefaultListItemProps) {
    const classes = useStyles();
    return (
        <ListItem>
            <ListItemIcon>
                <IconButton onClick={() => openDeleteConfirmation(item.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemIcon>
            <ListItemText primary={item.name} secondary={item.quantity} className={classes.wordBreak} />
            <ListItemSecondaryAction>
                {item.url && (
                    <IconButton
                        aria-label="link to product on ah.nl"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.url);
                        }}
                    >
                        <LinkIcon />
                    </IconButton>
                )}
                <IconButton onClick={() => addItemToItemList(item)}>{item.checked ? <CheckIcon /> : <AddIcon />}</IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
