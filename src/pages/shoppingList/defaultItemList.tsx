import React, { useState } from "react";
import List from "@material-ui/core/List";
import { Divider, Typography } from "@material-ui/core";
import AddItemModal from "./components/AddItemModal";
import LoadingList from "./components/LoadingList";
import ConfirmationModal from "./components/ConfirmationModal";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { DefaultListItem } from "./components/DefaultListItem";
import { useDeleteStandardItemMutation, useGetAllStandardItemsQuery } from "../../slices/api/api.slice";
import { StandardItem } from "../../interfaces/standardItem";
import { MODAL_TYPE_STANDARD_ITEM } from "../../interfaces/modalType";

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

export default function DefaultItemList() {
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
                {data && data.length > 0 ? (
                    [...data].map((item: StandardItem) => (
                        <div key={"standard_" + item.id}>
                            <DefaultListItem openDeleteConfirmation={openDeleteConfirmation} item={item} />
                            <Divider />
                        </div>
                    ))
                ) : (
                    <div className={classes.typographyDiv}>
                        <Typography variant={"h5"}>No standard items yet</Typography>
                    </div>
                )}
            </List>
            <AddItemModal useHideOnScroll={true} modalType={MODAL_TYPE_STANDARD_ITEM} />
            <ConfirmationModal isOpen={confirmationModalIsOpen} callback={deleteItem} setIsOpen={setIsOpen} id={itemId} />
        </div>
    );
}
