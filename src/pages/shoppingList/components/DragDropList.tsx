import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import { Item, status } from "../../../interfaces/item";
import { Divider, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SwipableItem from "./SwipeableItem";
import useRequest from "../../../hooks/useRequest";
import { ShoppingListContext } from "../../../contexts/ShoppingListContext";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { EmptyCartSVG } from "../../../components/svg/EmptyCartSVG";

interface DragDropListProps {
    openEditDialog: (item: Item) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        emptyShoppingListDiv: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            flexDirection: "column",
            height: "65vh",
        },
        svg: {
            width: "50%",
            height: "50%",
        },
    })
);

export default function DragDropList({ openEditDialog }: DragDropListProps) {
    const [isDisabled, updateIsDisabled] = useState(false);
    const { items, setItems } = useContext(ShoppingListContext);
    const [request] = useRequest();
    const classes = useStyles();

    const handleOnDragEnd = (result: any) => {
        updateIsDisabled(false);
        if (!result.destination || result.destination.index === result.source.index) return;

        const itemsCopy = items.slice();
        const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
        itemsCopy.splice(result.destination.index, 0, reorderedItem);

        setItems(itemsCopy);
        let sequenceItems = itemsCopy.map((item) => ({
            id: item.id,
            sequence: itemsCopy.indexOf(item),
        }));
        request({
            path: "updateSequence",
            data: {
                items: sequenceItems,
            },
        });
    };

    const deleteItem = (id: number) => {
        if (!items) return;
        const itemsArray = items.slice();
        const item = itemsArray.find((element) => element.id === id);
        if (!item) return;
        itemsArray.splice(items.indexOf(item), 1);
        setItems(itemsArray);
        request({
            path: "deleteItem",
            data: {
                id: item.id,
            },
        });
    };

    const markItem = (id: number, setDone: boolean): void => {
        if (!items) return;
        const itemsArray = items.slice();
        const item = itemsArray.find((element) => element.id === id);
        if (!item) return;
        if ((setDone && item.status === status.closed) || (!setDone && item.status === status.open)) return;
        setDone ? (item.status = status.closed) : (item.status = status.open);
        setItems(itemsArray);
        request({
            path: "updateItemStatus",
            data: {
                id: item.id,
                status: setDone ? status.closed : status.open,
            },
        });
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={() => updateIsDisabled(true)}>
            <Droppable droppableId={"DroppableShoppingList"}>
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {items
                            ? items.map((item, index) => (
                                  <Draggable key={item.id} draggableId={"draggableId-" + item.id} index={index}>
                                      {(provided) => (
                                          <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              key={"div" + item.id}
                                          >
                                              <SwipableItem
                                                  item={item}
                                                  isDisabled={isDisabled}
                                                  openEditDialog={openEditDialog}
                                                  markItem={markItem}
                                                  deleteItem={deleteItem}
                                              />
                                              <Divider />
                                          </div>
                                      )}
                                  </Draggable>
                              ))
                            : "An error has occured"}
                        {items?.length === 0 && (
                            <div className={classes.emptyShoppingListDiv}>
                                <EmptyCartSVG className={classes.svg} />
                                <Typography variant={"h5"}>Your shopping list is empty!</Typography>
                            </div>
                        )}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
}
