import React, {useEffect, useState} from "react";
import item, {unsubmittedItem} from "../../interfaces/item";
import List from "@material-ui/core/List";
import {
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LinkIcon from "@material-ui/icons/Link";
import AddItemModal from "../../components/AddItemModal";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingList from "../../components/LoadingList";
import CheckIcon from "@material-ui/icons/Check";
import ConfirmationModal from "../../components/ConfirmationModal";
import request from "../../components/lib/request";

export default function DefaultItemList() {
    const [items, setItems] = useState<item[]>([]);
    const [isLoading, updateIsLoading] = useState(true);
    const [confirmationModalIsOpen, setIsOpen] = useState(false);
    const [itemId, setItemId] = useState(0);

    const addItem = (item: unsubmittedItem): boolean => {
        if (!window.navigator.onLine) {
            return false;
        }
        request('addStandardItem', {
            item: {name: item.name, quantity: item.quantity, url: item.url}
        })
            .then(result => setItems(items.concat(result.item)))
            .catch(() => {
                return false;
            });

        return true;
    }

    const addItemToItemList = (item: item) => {
        request('addItem', {
            item: {name: item.name, quantity: item.quantity, url: item.url}
        }).then(() => {
            const itemsArray = items.slice();
            const element = itemsArray.find(element => element.id === item.id);
            if (!element) return;
            element.checked = true;
            setItems(itemsArray);
        });
    }

    const openDeleteConfirmation = (id: number) => {
        setItemId(id);
        setIsOpen(true);
    }

    const deleteItem = (id: number): void => {
        if (!items) return;
        const itemsArray = items.slice();
        const item = itemsArray.find(element => element.id === id);
        if (!item) return;
        if (item) itemsArray.splice(items.indexOf(item), 1);
        setItems(itemsArray);
        request('deleteStandardItem', {
            id: item.id
        });
    }

    useEffect(() => {
        request('getStandardItems').then((result) => setItems(result.items.sort(function (a: item, b: item) {
            return a.sequence - b.sequence
        }))).finally(() => updateIsLoading(false));
    }, [setItems])

    return (
        <>
            {isLoading ? <LoadingList/> :
                <>
                    <List style={{paddingBottom: '56px'}}>
                        {items && items.length > 0 ? items.map((item: item) => (
                            <div key={"standard_" + item.id}>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconButton onClick={() => {
                                            openDeleteConfirmation(item.id)
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} secondary={item.quantity}
                                                  style={{wordBreak: "break-word"}}/>
                                    <ListItemSecondaryAction>
                                        {item.url ?
                                            <IconButton aria-label="link to product on ah.nl"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(item.url)
                                                        }}><LinkIcon/></IconButton> : null}
                                        <IconButton onClick={() => addItemToItemList(item)}>
                                            {item.checked ? <CheckIcon/> : <AddIcon/>}
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider/>
                            </div>
                        )) : <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}><Typography
                            variant={"h5"}>No standard items yet</Typography>
                        </div>}
                    </List>
                    <AddItemModal addItemFunction={addItem} useHideOnScroll={true}/>
                    <ConfirmationModal isOpen={confirmationModalIsOpen} callback={deleteItem} setIsOpen={setIsOpen} id={itemId}/>
                </>
            }
        </>
    )
}
