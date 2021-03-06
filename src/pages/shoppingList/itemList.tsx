import { Snackbar } from "@mui/material";
import { Alert } from "@mui/lab";
import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Item } from "../../interfaces/item";
import { AddItemModal } from "./components/AddItemModal";
import { EditItemModal } from "./components/EditItemModal";
import { DragDropList } from "./components/DragDropList/DragDropList";
import { EditContext } from "../../contexts/EditContext";
import { useUpdateItemMutation } from "../../slices/api/api.slice";
import { MODAL_TYPE_ITEM } from "../../interfaces/modalType";

interface ItemListProps {
    setIsOnItemList: (newValue: boolean) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        paddingBottom: {
            paddingBottom: 56,
        },
    }),
);

export const ItemList = ({ setIsOnItemList }: ItemListProps): JSX.Element => {
    const classes = useStyles();
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const { setEditingItem, setIsEditDialogOpen } = useContext(EditContext);
    const [updateItem] = useUpdateItemMutation();

    const editItem = (item: Item): boolean => {
        if (!window.navigator.onLine) {
            setSnackbarOpen(true);
            return false;
        }
        void updateItem(item);
        return true;
    };

    const openEditDialog = (item: Item): void => {
        if (item.status === 2) return;
        setIsEditDialogOpen(true);
        setEditingItem(item);
    };

    const handleSnackbarClose = (event: Event | React.SyntheticEvent, reason?: string): void => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    useEffect(() => {
        setIsOnItemList(true);

        return (): void => {
            setIsOnItemList(false);
        };
    }, [setIsOnItemList]);

    return (
        <div>
            {/* TODO: export this component to ServerErrorBar or create new system to show errors */}
            <Snackbar
                open={SnackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} variant="filled" severity="warning">
                    Something went wrong sending the item to the server.
                </Alert>
            </Snackbar>
            <div className={classes.paddingBottom}>
                <DragDropList openEditDialog={openEditDialog} />
            </div>
            <AddItemModal useHideOnScroll={false} modalType={MODAL_TYPE_ITEM} />
            <EditItemModal editItemFunction={editItem} />
        </div>
    );
};
