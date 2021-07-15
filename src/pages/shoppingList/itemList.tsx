import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoadingList from "../../components/LoadingList";
import { Item, unsubmittedItem } from "../../interfaces/item";
import AddItemModal from "../../components/AddItemModal";
import EditItemModal from "../../components/EditItemModal";
import React, { useContext, useEffect, useState } from "react";
import DragDropList from "../../components/DragDropList";
import useRequest from "../../hooks/useRequest";
import { ShoppingListContext } from "../../contexts/ShoppingListContext";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { EditContext } from "../../contexts/EditContext";

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
    const [isLoading, updateIsLoading] = useState(true);
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const { setEditingItem, setIsEditDialogOpen } = useContext(EditContext);
    const { setItems } = useContext(ShoppingListContext);
    const [request] = useRequest();

    const addItem = (item: unsubmittedItem): boolean => {
        if (!window.navigator.onLine) {
            setSnackbarOpen(true);
            return false;
        }
        request({
            path: "addItem",
            data: {
                item: {
                    name: item.name,
                    quantity: item.quantity,
                    url: item.url,
                },
            },
        }).catch(() => setSnackbarOpen(true));
        return true;
    };

    const editItem = (item: Item): boolean => {
        if (!window.navigator.onLine) {
            setSnackbarOpen(true);
            return false;
        }
        request({
            path: "updateItem",
            data: {
                item: {
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    url: item.url,
                    status: item.status,
                },
            },
        }).catch(() => {
            setSnackbarOpen(true);
            return false;
        });
        return true;
    };

    const openEditDialog = (item: Item) => {
        if (item.status === 1) return;
        setIsEditDialogOpen(true);
        setEditingItem(item);
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    useEffect(() => {
        setIsOnItemList(true);
        request({ path: "getItemList" })
            .then((result) =>
                setItems(
                    result.items.sort(function (a: Item, b: Item) {
                        return a.sequence - b.sequence;
                    })
                )
            )
            .finally(() => updateIsLoading(false))
            .catch((e) => {
                console.error(e);
            });

        return () => {
            setIsOnItemList(false);
        };
    }, []);

    return (
        <div>
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
            {isLoading ? (
                <LoadingList />
            ) : (
                <div className={classes.paddingBottom}>
                    <DragDropList openEditDialog={openEditDialog} />
                </div>
            )}
            <AddItemModal addItemFunction={addItem} useHideOnScroll={false} />
            <EditItemModal editItemFunction={editItem} />
        </div>
    );
}
