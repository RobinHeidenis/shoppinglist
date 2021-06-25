import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import item, {status} from "../interfaces/item";
import {Divider, Typography} from "@material-ui/core";
import React, {useContext, useState} from "react";
import SwipableItem from "./SwipeableItem";
import request from "./lib/request";
import { ShoppingListContext, ShoppingListContextType } from "../contexts/ShoppingListContext";

interface props {
    openEditDialog: (item: item) => void,
}

export default function DragDropList(props: props) {
    const [isDisabled, updateIsDisabled] = useState(false);
    const context = useContext(ShoppingListContext) as ShoppingListContextType;

    function handleOnDragStart() {
        updateIsDisabled(true);
    }

    function handleOnDragEnd(result: any) {
        updateIsDisabled(false);
        if (!result.destination || result.destination.index === result.source.index) return;

        const itemsCopy = context.items.slice();

        const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
        itemsCopy.splice(result.destination.index, 0, reorderedItem);

        context.setItems(itemsCopy);

        let sequenceItems = itemsCopy.map(item => ({id: item.id, sequence: itemsCopy.indexOf(item)}))

        request('updateSequence', {
            items: sequenceItems
        })
    }

    const deleteItem = (id: number): void => {
        if (!context.items) return;
        const itemsArray = context.items.slice();
        const item = itemsArray.find(element => element.id === id);
        if (!item) return;
        if (item) itemsArray.splice(context.items.indexOf(item), 1);
        context.setItems(itemsArray);
        request('deleteItem', {
            id: item.id
        });
    }

    const markItem = (id: number, setDone: boolean): void => {
        if (!context.items) return;
        const itemsArray = context.items.slice();
        const item = itemsArray.find(element => element.id === id);
        if (!item) return;
        if ((setDone && item.status === status.closed) || (!setDone && item.status === status.open)) return;
        setDone ? item.status = status.closed : item.status = status.open;
        context.setItems(itemsArray);
        setDone ?
            request('updateItemStatus', {
                id: item.id, status: status.closed
            }) :
            request('updateItemStatus', {
                id: item.id, status: status.open
            })
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
            <Droppable droppableId={"DroppableShoppingList"}>
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {context.items ? context.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={'draggableId-' + item.id}
                                       index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        key={'div' + item.id}>
                                        <SwipableItem item={item} isDisabled={isDisabled}
                                                      openEditDialog={props.openEditDialog}
                                                      markItem={markItem} deleteItem={deleteItem}/>
                                        <Divider/>
                                    </div>
                                )}
                            </Draggable>
                        )) : "An error has occured"}
                        {context.items?.length === 0 ?
                            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                <Typography variant={"h5"}>Your shopping list is
                                    empty!</Typography>
                            </div> : null}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    )
}
