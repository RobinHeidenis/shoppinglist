import { Item, status } from "../../../interfaces/item";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import React from "react";
import SwipeableListItem from "../../../components/lib/SwipeableListItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";

interface SwipeableListItemProps {
    item: Item;
    isDisabled: boolean;
    openEditDialog: (item: Item) => void;
    markItem: (id: number, setDone: boolean) => void;
    deleteItem: (id: number) => void;
}

const useStyles = makeStyles(() =>
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

export default function SwipableItem({ item, isDisabled, openEditDialog, markItem, deleteItem }: SwipeableListItemProps) {
    const classes = useStyles();

    return (
        <SwipeableListItem
            key={item.id}
            disabled={isDisabled}
            onClickEventHandler={() => openEditDialog(item)}
            background={{
                actionIconRight: item.status === status.open ? <DoneIcon /> : <UndoIcon />,
                backgroundColorRight: item.status === status.open ? "#008000" : "orange",
                actionIconLeft: <DeleteIcon />,
                backgroundColorLeft: "red",
            }}
            onSwipedRight={() => markItem(item.id, item.status === status.open)}
            onSwipedLeft={() => item.id && deleteItem(item.id)}
            primaryText={item.name}
            secondaryText={item.quantity}
            itemIcon={
                item.url ? (
                    <IconButton
                        aria-label="link to product on ah.nl"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.url);
                        }}
                        className={item.status === status.closed ? classes.itemDone : classes.itemNotDone}
                    >
                        <LinkIcon />
                    </IconButton>
                ) : (
                    <IconButton disabled>
                        <LinkIcon className={classes.opacityZero} />
                    </IconButton>
                )
            }
            ListItemTextProps={
                item.status === status.closed
                    ? {
                          primaryTypographyProps: {
                              className: classes.itemDone,
                          },
                          secondaryTypographyProps: {
                              className: classes.itemDone,
                          },
                      }
                    : undefined
            }
        />
    );
}
