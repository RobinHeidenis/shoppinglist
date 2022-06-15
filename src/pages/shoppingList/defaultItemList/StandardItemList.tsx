import React, { useState } from "react";
import List from "@mui/material/List";
import { createStyles, makeStyles } from "@mui/styles";
import { AddItemModal } from "../components/AddItemModal";
import { LoadingList } from "../components/LoadingList";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useDeleteStandardItemMutation, useGetAllStandardItemsQuery } from "../../../slices/api/api.slice";
import { StandardItem } from "../../../interfaces/standardItem";
import { MODAL_TYPE_STANDARD_ITEM } from "../../../interfaces/modalType";
import { NoStandardItems } from "./components/NoStandardItems";
import { StandardListItemComponent } from "./components/StandardListItemComponent";

/**
 * Styles for the {@link StandardItemList} functional component
 */
const useStyles = makeStyles(() =>
    createStyles({
        list: {
            paddingBottom: 56,
        },
        typographyDiv: {
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
        },
    }),
);

/**
 * Functional Component <br/>
 *
 * Shows a list of {@link StandardItem Standard Items}. <br/>
 * Also contains a {@link ConfirmationModal Delete Item Confirmation Modal},
 * and a {@link AddItemModal}. <br/>
 *
 * If no items are presents, the {@link NoStandardItems} component will be shown. <br/>
 *
 * Uses {@link shoppingListApi RTK Query} to delete an item if confirmation modal interaction was positive.
 * @constructor
 */
export const StandardItemList = (): JSX.Element => {
    const classes = useStyles();
    const [confirmationModalIsOpen, setIsOpen] = useState(false);
    const [itemId, setItemId] = useState(0);
    const { data, isLoading } = useGetAllStandardItemsQuery();
    const [deleteItem] = useDeleteStandardItemMutation();

    /**
     * Sets the {@link itemId} property using the {@link setItemId} function to the id passed. <br/>
     * Sets the {@link confirmationModalIsOpen} property using the {@link setIsOpen} function to true. <br/>
     * This opens the {@link ConfirmationModal Delete Confirmation Modal}
     * @param id
     */
    const openDeleteConfirmation = (id: number): void => {
        setItemId(id);
        setIsOpen(true);
    };

    if (isLoading) return <LoadingList />;

    return (
        <div>
            <List className={classes.list}>
                {data?.length ? (
                    [...data].map((item: StandardItem) => (
                        <StandardListItemComponent openFn={openDeleteConfirmation} item={item} key={item.id} />
                    ))
                ) : (
                    <NoStandardItems />
                )}
            </List>
            <AddItemModal useHideOnScroll modalType={MODAL_TYPE_STANDARD_ITEM} />
            {/* We don't control the type of deleteItem, so we have to use promises */}
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <ConfirmationModal isOpen={confirmationModalIsOpen} callback={deleteItem} setIsOpen={setIsOpen} id={itemId} />
        </div>
    );
};
