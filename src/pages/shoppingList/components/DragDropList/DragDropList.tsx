import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import { Item } from "../../../../interfaces/item";
import { SwipeableItem } from "../SwipeableItem";
import { useGetAllItemsQuery, useUpdateSequencesMutation } from "../../../../slices/api/api.slice";
import { LoadingList } from "../LoadingList";
import { NoItems } from "./components/NoItems";

interface DragDropListProps {
    openEditDialog: (item: Item) => void;
}

/**
 * Functional Component
 *
 * Renders a list of drag and droppable {@link SwipeableItem Swipeable items} and dividers in between.
 *
 * Includes a function to reorder the items in the data array after dropping an item.
 * This uses {@link shoppingListApi RTK Query} to send the new sequences to the server.
 *
 * If no elements have been found, the {@link NoItems} component is shown.
 * @param openEditDialog
 * @constructor
 */
export const DragDropList = ({ openEditDialog }: DragDropListProps): JSX.Element => {
    const [isDisabled, setIsDisabled] = useState(false);
    const { data, isLoading } = useGetAllItemsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [updateSequences] = useUpdateSequencesMutation();

    if (isLoading) return <LoadingList />;

    if (!data?.length) return <NoItems />;

    /**
     * Reorders the local item sequences, making the list show the proper order.
     *
     * Uses {@link shoppingListApi RTK Query} to update the sequences in the backend.
     * @param result
     */
    const handleOnDragEnd = (result: DropResult): void => {
        setIsDisabled(false);
        if (!result.destination || result.destination.index === result.source.index) return;

        const itemList = [...data];

        const [reorderedItem] = itemList.splice(result.source.index, 1);
        itemList.splice(result.destination.index, 0, reorderedItem);

        const sequenceItems = itemList.map((item) => ({
            id: item.id,
            sequence: itemList.indexOf(item),
        }));

        void updateSequences(sequenceItems);
    };

    return (
        <DragDropContext
            onDragEnd={handleOnDragEnd}
            onDragStart={(): void => {
                setIsDisabled(true);
            }}
        >
            <Droppable droppableId="DroppableShoppingList">
                {(provided): JSX.Element => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {data.map((item: Item, index) => (
                            <Draggable key={item.id} draggableId={`draggableId-${item.id}`} index={index}>
                                {(draggableProvided): JSX.Element => (
                                    <div
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        key={`div${item.id}`}
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
};
