import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import LoadingList from "../../components/LoadingList";
import item, {unsubmittedItem} from "../../interfaces/item";
import AddItemModal from "../../components/AddItemModal";
import EditItemModal from "../../components/EditItemModal";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import DragDropList from "../../components/dragDropList";
import request from "../../components/lib/request";

interface propsInterface {
    items: item[],
    setItems: Dispatch<SetStateAction<item[]>>,
    setIsOnItemList: (newValue: boolean) => void;
}

export default function ItemList({items, setItems, setIsOnItemList}: propsInterface) {
    const [isLoading, updateIsLoading] = useState(true);
    const [isEditDialogOpen, updateIsEditDialogOpen] = useState(false);
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [editingItem, updateEditingItem] = useState({id: 0, name: "", quantity: "", url: "", status: 0} as item);

    const addItem = useCallback((item: unsubmittedItem): boolean => {
        if (!window.navigator.onLine) {
            setSnackbarOpen(true);
            return false;
        }
        request('addItem', {
            item: {name: item.name, quantity: item.quantity, url: item.url}
        })
            .then(result => setItems(items.concat(result.item)))
            .catch(() => setSnackbarOpen(true));

        return true;
    }, [items, setItems, setSnackbarOpen]);

    const editItem = useCallback( (item: item): boolean => {
        if (!window.navigator.onLine) {
            setSnackbarOpen(true);
            return false;
        }
        request('updateItem', {
            item: {
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                url: item.url,
                status: item.status
            }
        }).catch(() => {
            setSnackbarOpen(true);
            return false;
        });

        return true;
    }, [setSnackbarOpen]);

    const openEditDialog = (item: item) => {
        if (item.status === 1) return;
        updateIsEditDialogOpen(true);
        updateEditingItem(item);
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    useEffect(() => {
        setIsOnItemList(true);
        request('getItemList').then((result) => setItems(result.items.sort(function (a: item, b: item) {
            return a.sequence - b.sequence
        }))).finally(() => updateIsLoading(false));

        return () => {
            setIsOnItemList(false)
        }
    }, [setIsOnItemList, setItems])

    return (
        <>
            <Snackbar open={SnackbarOpen} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "center"}}
                      onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} variant={"filled"} severity="warning">
                    Something went wrong sending the item to the server.
                </Alert>
            </Snackbar>
            {isLoading ? <LoadingList/> :
                <div style={{paddingBottom: '56px'}}>
                    <DragDropList items={items} setItems={setItems} openEditDialog={openEditDialog}/>
                </div>
            }
            <AddItemModal addItemFunction={addItem} useHideOnScroll={false}/>
            <EditItemModal editItemFunction={editItem} open={isEditDialogOpen} setOpen={updateIsEditDialogOpen}
                           item={editingItem}/>
        </>
    )
}
