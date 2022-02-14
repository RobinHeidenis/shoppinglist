import SearchBar from "material-ui-search-bar";
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import LoadingSearch from "./components/LoadingSearch";
import useRequest from "../../hooks/useRequest";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { SearchContext } from "../../contexts/SearchContext";
import { EditContext } from "../../contexts/EditContext";
import { BottomNavContext } from "../../contexts/BottomNavContext";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSearchQuery } from "../../slices/api/api.slice";

export interface SearchResultItem {
    id: number;
    name: string;
    url: string;
    imageUrl: string;
    price: {
        amount: number;
        unitSize: string;
    };
    checked: boolean;
}

const useStyles = makeStyles(() =>
    createStyles({
        SearchBarDiv: {
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
    })
);

export default function Search() {
    const classes = useStyles();
    const [items, setItems] = useState([] as SearchResultItem[]);
    const [executeQuery, setExecuteQuery] = useState(false);
    const [request] = useRequest();
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const { isEditing, setEditingItem, editingItem, setIsEditDialogOpen } = useContext(EditContext);
    const { setBottomNavValue } = useContext(BottomNavContext);

    const { data, isLoading } = useSearchQuery(executeQuery ? searchValue : skipToken);

    function handleClick(item: SearchResultItem) {
        if (isEditing) {
            setEditingItem({
                id: editingItem.id,
                name: `${item.name} ${item.price.unitSize}`,
                quantity: "",
                url: item.url,
                checked: editingItem.checked,
                status: editingItem.status,
                sequence: editingItem.sequence,
            });
            setIsEditDialogOpen(true);
            setBottomNavValue(1);
            return;
        }
        request({
            path: "addItem",
            data: {
                item: { name: `${item.name} ${item.price.unitSize}`, quantity: "", url: item.url },
            },
        });
        const itemsArray = items.slice();
        const element = itemsArray.find((element) => element.id === item.id);
        if (!element) return;
        element.checked = true;
        setItems(itemsArray);
    }

    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);

    return (
        <div>
            <div className={classes.SearchBarDiv}>
                <SearchBar
                    value={searchValue}
                    onChange={(newValue) => setSearchValue(newValue)}
                    onRequestSearch={() => setExecuteQuery(true)}
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
                                <img src={item.imageUrl} alt="" width={"auto"} className={classes.AlignSelfCenter} loading={"lazy"} />
                                <Typography variant={"h6"}>{item.name}</Typography>
                                <div className={classes.CardContentInnerDiv}>
                                    <div>
                                        <Typography>{item.price.unitSize}</Typography>
                                        <Typography>€{item.price.amount}</Typography>
                                    </div>
                                    <IconButton onClick={() => handleClick(item)}>{item.checked ? <CheckIcon /> : <AddIcon />}</IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
