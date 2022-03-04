import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import { Item } from "../../../interfaces/item";
import { Divider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import SwipeableItem from "./SwipeableItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useGetAllItemsQuery, useUpdateSequencesMutation } from "../../../slices/api/api.slice";
import LoadingList from "./LoadingList";
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
    //TODO: rename this to setIsDisabled
    const [isDisabled, updateIsDisabled] = useState(false);
    const classes = useStyles();
    const { data, isLoading } = useGetAllItemsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [updateSequences] = useUpdateSequencesMutation();

    if (isLoading) return <LoadingList />;

    if (!data || data.length === 0)
        return (
            <div className={classes.emptyShoppingListDiv}>
                <EmptyCartSVG className={classes.svg} />
                <Typography variant={"h5"}>Your shopping list is empty!</Typography>
            </div>
        );

    const handleOnDragEnd = (result: any) => {
        updateIsDisabled(false);
        if (!result.destination || result.destination.index === result.source.index) return;

        const itemList = [...data];

        const [reorderedItem] = itemList.splice(result.source.index, 1);
        itemList.splice(result.destination.index, 0, reorderedItem);

        let sequenceItems = itemList.map((item) => ({
            id: item.id,
            sequence: itemList.indexOf(item),
        }));

        updateSequences(sequenceItems);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={() => updateIsDisabled(true)}>
            <Droppable droppableId={"DroppableShoppingList"}>
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {data.map((item: Item, index) => (
                            <Draggable key={item.id} draggableId={"draggableId-" + item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        key={"div" + item.id}
                                    >
                                        <SwipeableItem item={item} isDisabled={isDisabled} openEditDialog={openEditDialog} />
                                        <Divider />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
}
