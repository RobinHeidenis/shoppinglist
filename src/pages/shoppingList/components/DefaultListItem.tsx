import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { StandardItem } from "../../../interfaces/standardItem";
import { useAddItemMutation } from "../../../slices/api/api.slice";
import { UnsubmittedItem } from "../../../interfaces/item";
import CheckIcon from "@material-ui/icons/Check";

interface DefaultListItemProps {
    openDeleteConfirmation: (id: number) => void;
    item: StandardItem;
}

const useStyles = makeStyles(() =>
    createStyles({
        wordBreak: {
            wordBreak: "break-word",
        },
    })
);

export function DefaultListItem({ openDeleteConfirmation, item }: DefaultListItemProps) {
    const [addItem] = useAddItemMutation();
    const [checked, setChecked] = useState(false);
    const classes = useStyles();

    const addItemToList = () => {
        const newItem: Partial<UnsubmittedItem> = { name: item.name, categoryId: 1 };
        item.quantity && (newItem.quantity = item.quantity);
        item.url && (newItem.url = item.url);
        addItem(newItem);
        setChecked(true);
    };

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
                            item.url && window.open(item.url);
                        }}
                    >
                        <LinkIcon />
                    </IconButton>
                )}
                <IconButton onClick={addItemToList}>{checked ? <CheckIcon /> : <AddIcon />}</IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
