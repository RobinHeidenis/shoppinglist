import item, {status} from "../interfaces/item";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import {IconButton} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import React from "react";
import SwipeableListItem from "./lib/SwipeableListItem";

interface props {
    item: item,
    isDisabled: boolean,
    openEditDialog: (item: item) => void,
    markItem: (id: number, setDone: boolean) => void,
    deleteItem: (id: number) => void
}

export default function SwipableItem(props: props) {
    return (
        <SwipeableListItem key={props.item.id}
                           disabled={props.isDisabled}
                           onClickEventHandler={() => props.openEditDialog(props.item)}
                           background={{
                               actionIconRight: props.item.status === status.open ?
                                   <DoneIcon/> :
                                   <UndoIcon/>,
                               backgroundColorRight: props.item.status === status.open ? "#008000" : "orange",
                               actionIconLeft: <DeleteIcon/>,
                               backgroundColorLeft: "red"
                           }}
                           onSwipedRight={() =>
                               props.item.status === status.open && props.item.id ?
                                   props.markItem(props.item.id, true) :
                                   props.markItem(props.item.id, false)
                           }
                           onSwipedLeft={() =>
                               props.item.id ? props.deleteItem(props.item.id) : undefined
                           }
                           primaryText={props.item.name}
                           secondaryText={props.item.quantity}
                           itemIcon={props.item.url ?
                               <IconButton
                                   aria-label="link to product on ah.nl"
                                   onClick={(e) => {
                                       e.stopPropagation();
                                       window.open(props.item.url)
                                   }}><LinkIcon/></IconButton> :
                               <IconButton disabled> <LinkIcon
                                   style={{opacity: '0%'}}/>
                               </IconButton>}
                           ListItemTextProps={props.item.status === status.closed ? {
                               primaryTypographyProps: {style: {textDecoration: "line-through"}},
                               secondaryTypographyProps: {style: {textDecoration: "line-through"}}
                           } : undefined}
        />);
}
