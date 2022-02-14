import React, { useEffect, useState } from "react";
import { Item, unsubmittedItem } from "../../interfaces/item";
import List from "@material-ui/core/List";
import { Divider, Typography } from "@material-ui/core";
import AddItemModal from "./components/AddItemModal";
import LoadingList from "./components/LoadingList";
import ConfirmationModal from "./components/ConfirmationModal";
import useRequest from "../../hooks/useRequest";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { DefaultListItem } from "./components/DefaultListItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setStandardItems } from "../../slices/standardItems/standardItems.slice";
import { useGetAllStandardItemsQuery } from "../../slices/api/api.slice";

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
    const [request] = useRequest();
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.standardItems.standardItems);
    const { data, isLoading } = useGetAllStandardItemsQuery();

    const addItem = (item: unsubmittedItem): boolean => {
        if (!window.navigator.onLine) {
            return false;
        }
        request({
            path: "addStandardItem",
            data: {
                item: {
                    name: item.name,
                    quantity: item.quantity,
                    url: item.url,
                },
            },
        })
            .then((result) => dispatch(setStandardItems(items.concat(result.item))))
            .catch((error) => {
                console.error(error);
                return false;
            });

        return true;
    };

    const addItemToItemList = (item: Item) => {
        request({
            path: "addItem",
            data: {
                item: {
                    name: item.name,
                    quantity: item.quantity,
                    url: item.url,
                },
            },
        }).then(() => {
            const itemsArray = items.slice();
            const element = itemsArray.find((element) => element.id === item.id);
            if (!element) return;
            element.checked = true;
            // setItems(itemsArray);
        });
    };

    const openDeleteConfirmation = (id: number) => {
        setItemId(id);
        setIsOpen(true);
    };

    const deleteItem = (id: number): void => {
        if (!items) return;
        const itemsArray = items.slice();
        const item = itemsArray.find((element) => element.id === id);
        if (!item) return;
        if (item) itemsArray.splice(items.indexOf(item), 1);
        // setItems(itemsArray);
        request({
            path: "deleteStandardItem",
            data: {
                id: item.id,
            },
        });
    };

    useEffect(() => {
        if (data) {
            dispatch(
                setStandardItems(
                    [...data].sort(function (a: Item, b: Item) {
                        return a.sequence - b.sequence;
                    })
                )
            );
        }
    }, [data]);

    return (
        <div>
            {isLoading ? (
                <LoadingList />
            ) : (
                <div>
                    <List className={classes.list}>
                        {items.length > 0 ? (
                            items.map((item: Item) => (
                                <div key={"standard_" + item.id}>
                                    <DefaultListItem
                                        openDeleteConfirmation={openDeleteConfirmation}
                                        addItemToItemList={addItemToItemList}
                                        item={item}
                                    />
                                    <Divider />
                                </div>
                            ))
                        ) : (
                            <div className={classes.typographyDiv}>
                                <Typography variant={"h5"}>No standard items yet</Typography>
                            </div>
                        )}
                    </List>
                    <AddItemModal useHideOnScroll={true} />
                    <ConfirmationModal isOpen={confirmationModalIsOpen} callback={deleteItem} setIsOpen={setIsOpen} id={itemId} />
                </div>
            )}
        </div>
    );
}
