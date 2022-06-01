import SearchBar from "material-ui-search-bar";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { skipToken } from "@reduxjs/toolkit/query";
import { LoadingSearch } from "./components/LoadingSearch";
import { SearchContext } from "../../contexts/SearchContext";
import { EditContext } from "../../contexts/EditContext";
import { BottomNavContext } from "../../contexts/BottomNavContext";
import { useAddItemMutation, useSearchQuery } from "../../slices/api/api.slice";
import { SearchResultItem } from "../../interfaces/SearchResultItem";

/**
 * Styles for the {@link Search} functional component.
 */
const useStyles = makeStyles(() =>
    createStyles({
        SearchBarWrapper: {
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            width: "100%",
            zIndex: 100,
        },
        SearchBar: {
            width: "75%",
            marginTop: "10px",
        },
        ContentDiv: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "70px",
            paddingBottom: "70px",
        },
        Card: {
            margin: "5px",
            width: "250px",
        },
        CardContent: {
            display: "flex",
            flexDirection: "column",
        },
        AlignSelfCenter: {
            alignSelf: "center",
        },
        CardContentInnerDiv: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
        },
    }),
);

export const Search = (): JSX.Element => {
    const classes = useStyles();
    const [items, setItems] = useState([] as SearchResultItem[]);
    const [executeQuery, setExecuteQuery] = useState(false);
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const { isEditing, setEditingItem, editingItem, setIsEditDialogOpen } = useContext(EditContext);
    const { setBottomNavValue } = useContext(BottomNavContext);
    const [addItem] = useAddItemMutation();

    const { data, isLoading } = useSearchQuery(executeQuery ? searchValue : skipToken);

    const handleClick = async (item: SearchResultItem): Promise<void> => {
        const itemName = `${item.name} ${item.price.unitSize}`;
        if (!isEditing) {
            await addItem({ name: itemName, url: item.url, categoryId: 1 });
            return;
        }

        setEditingItem({
            ...editingItem,
            name: itemName,
            quantity: "",
            url: item.url,
        });
        setIsEditDialogOpen(true);
        setBottomNavValue(1);
    };

    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);

    return (
        <div>
            <div className={classes.SearchBarWrapper}>
                <SearchBar
                    value={searchValue}
                    onChange={setSearchValue}
                    onRequestSearch={(): void => {
                        setExecuteQuery(true);
                    }}
                    className={classes.SearchBar}
                />
            </div>
            <div className={classes.ContentDiv}>
                {isLoading ? (
                    <LoadingSearch />
                ) : (
                    items.map((item) => (
                        <Card className={classes.Card} key={item.id}>
                            <CardContent className={classes.CardContent}>
                                <img
                                    src={item.imageUrl}
                                    alt=""
                                    width="auto"
                                    height={220}
                                    className={classes.AlignSelfCenter}
                                    loading="lazy"
                                />
                                <Typography variant="h6">{item.name}</Typography>
                                <div className={classes.CardContentInnerDiv}>
                                    <div>
                                        <Typography>{item.price.unitSize}</Typography>
                                        <Typography>€{item.price.amount}</Typography>
                                    </div>
                                    <IconButton
                                        onClick={(): void => {
                                            void handleClick(item);
                                        }}
                                    >
                                        {item.checked ? <CheckIcon /> : <AddIcon />}
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
