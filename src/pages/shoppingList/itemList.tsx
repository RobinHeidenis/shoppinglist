import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Item } from "../../interfaces/item";
import AddItemModal from "./components/AddItemModal";
import EditItemModal from "./components/EditItemModal";
import React, { useContext, useEffect, useState } from "react";
import DragDropList from "./components/DragDropList";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { EditContext } from "../../contexts/EditContext";
import { useUpdateItemMutation } from "../../slices/api/api.slice";
import { MODAL_TYPE_ITEM } from "../../interfaces/modalType";
import { SwipeableItem } from "./components/SwipeableItem";

interface ItemListProps {
    setIsOnItemList: (newValue: boolean) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        paddingBottom: {
            paddingBottom: 56,
        },
    })
);

export default function ItemList({ setIsOnItemList }: ItemListProps) {
    const classes = useStyles();
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const { setEditingItem, setIsEditDialogOpen } = useContext(EditContext);
    const [updateItem] = useUpdateItemMutation();

    const editItem = (item: Item): boolean => {
        if (!window.navigator.onLine) {
            setSnackbarOpen(true);
            return false;
        }
        updateItem(item);
        return true;
    };

    const openEditDialog = (item: Item) => {
        if (item.status === 2) return;
        setIsEditDialogOpen(true);
        setEditingItem(item);
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    useEffect(() => {
        setIsOnItemList(true);

        return () => {
            setIsOnItemList(false);
        };
    }, []);

    return (
        <div>
            {/*TODO: export this component to ServerErrorBar or create new system to show errors*/}
            <Snackbar
                open={SnackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} variant={"filled"} severity="warning">
                    Something went wrong sending the item to the server.
                </Alert>
            </Snackbar>
            <div className={classes.paddingBottom}>
                <DragDropList openEditDialog={openEditDialog} />
                <SwipeableItem
                    item={{ id: 1, name: "pee", quantity: "", url: "asd", status: 2, sequence: 1 }}
                    isDisabled={false}
                    openEditDialog={openEditDialog}
                />
            </div>
            <AddItemModal useHideOnScroll={false} modalType={MODAL_TYPE_ITEM} />
            <EditItemModal editItemFunction={editItem} />
        </div>
    );
}
