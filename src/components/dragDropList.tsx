import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import item, {status} from "../interfaces/item";
import {Divider, Typography} from "@material-ui/core";
import React, {useState} from "react";
import SwipableItem from "./SwipeableItem";
import request from "./lib/request";

interface props {
    items: item[],
    setItems: (newValue: item[]) => void,
    openEditDialog: (item: item) => void,
}

export default function DragDropList(props: props) {
    const [isDisabled, updateIsDisabled] = useState(false);

    function handleOnDragStart() {
        updateIsDisabled(true);
    }

    function handleOnDragEnd(result: any) {
        updateIsDisabled(false);
        if (!result.destination) return;

        const [reorderedItem] = props.items.splice(result.source.index, 1);
        props.items.splice(result.destination.index, 0, reorderedItem);

        props.setItems(props.items);

        let sequenceItems = props.items.map(item => ({id: item.id, sequence: props.items.indexOf(item)}))

        request('updateSequence', {
            items: sequenceItems
        })
    }

    const deleteItem = (id: number): void => {
        if (!props.items) return;
        const itemsArray = props.items.slice();
        const item = itemsArray.find(element => element.id === id);
        if (!item) return;
        if (item) itemsArray.splice(props.items.indexOf(item), 1);
        props.setItems(itemsArray);
        request('deleteItem', {
            id: item.id
        });
    }

    const markItem = (id: number, setDone: boolean): void => {
        if (!props.items) return;
        const itemsArray = props.items.slice();
        const item = itemsArray.find(element => element.id === id);
        if (!item) return;
        if ((setDone && item.status === status.closed) || (!setDone && item.status === status.open)) return;
        setDone ? item.status = status.closed : item.status = status.open;
        props.setItems(itemsArray);
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
                        {props.items ? props.items.map((item, index) => (
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
                        {props.items?.length === 0 ?
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
