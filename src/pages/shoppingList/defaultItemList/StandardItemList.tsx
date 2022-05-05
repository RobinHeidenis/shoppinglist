import React, { useState } from "react";
import List from "@material-ui/core/List";
import AddItemModal from "../components/AddItemModal";
import LoadingList from "../components/LoadingList";
import ConfirmationModal from "../components/ConfirmationModal";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDeleteStandardItemMutation, useGetAllStandardItemsQuery } from "../../../slices/api/api.slice";
import { StandardItem } from "../../../interfaces/standardItem";
import { MODAL_TYPE_STANDARD_ITEM } from "../../../interfaces/modalType";
import { NoStandardItems } from "./components/NoStandardItems";
import { StandardListItemComponent } from "./components/StandardListItemComponent";

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
    })
);

export const StandardItemList = (): JSX.Element => {
    const classes = useStyles();
    const [confirmationModalIsOpen, setIsOpen] = useState(false);
    const [itemId, setItemId] = useState(0);
    const { data, isLoading } = useGetAllStandardItemsQuery();
    const [deleteItem] = useDeleteStandardItemMutation();

    const openDeleteConfirmation = (id: number) => {
        setItemId(id);
        setIsOpen(true);
    };

    if (isLoading) return <LoadingList />;

    return (
        <div>
            <List className={classes.list}>
                {/*could be shortened to data?.length ? ... : ...*/}
                {data?.length ? (
                    [...data].map((item: StandardItem) => <StandardListItemComponent openFn={openDeleteConfirmation} item={item} />)
                ) : (
                    <NoStandardItems />
                )}
            </List>
            <AddItemModal useHideOnScroll modalType={MODAL_TYPE_STANDARD_ITEM} />
            <ConfirmationModal isOpen={confirmationModalIsOpen} callback={deleteItem} setIsOpen={setIsOpen} id={itemId} />
        </div>
    );
};
