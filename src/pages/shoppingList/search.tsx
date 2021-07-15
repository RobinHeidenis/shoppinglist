import SearchBar from "material-ui-search-bar";
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import LoadingSearch from "../../components/LoadingSearch";
import useRequest from "../../hooks/useRequest";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { SearchContext } from "../../contexts/SearchContext";
import { EditContext } from "../../contexts/EditContext";
import { BottomNavContext } from "../../contexts/BottomNavContext";

interface searchResultItem {
    name: string;
    link: string;
    img: string;
    amount: string;
    price: string;
    id: string;
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
    const [items, setItems] = useState([] as searchResultItem[]);
    const [isLoading, setIsLoading] = useState(false);
    const [request] = useRequest();
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const { isEditing, setEditingItem, editingItem, setIsEditDialogOpen } = useContext(EditContext);
    const { setBottomNavValue } = useContext(BottomNavContext);

    function search(query: string, setItems: any) {
        setIsLoading(true);
        request({
            path: "search",
            data: {
                query: query,
            },
        })
            .then((result) => setItems(result.result))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleClick(item: searchResultItem) {
        if (isEditing) {
            setEditingItem({
                id: editingItem.id,
                name: `${item.name} ${item.amount}`,
                quantity: "",
                url: item.link,
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
                item: { name: `${item.name} ${item.amount}`, quantity: "", url: item.link },
            },
        });
        const itemsArray = items.slice();
        const element = itemsArray.find((element) => element.id === item.id);
        if (!element) return;
        element.checked = true;
        setItems(itemsArray);
    }

    useEffect(() => {
        if (searchValue) search(searchValue, setItems);
    }, []);

    return (
        <div>
            <div className={classes.SearchBarDiv}>
                <SearchBar
                    value={searchValue}
                    onChange={(newValue) => setSearchValue(newValue)}
                    onRequestSearch={() => search(searchValue, setItems)}
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
                                <img src={item.img} alt="" width={"auto"} className={classes.AlignSelfCenter} loading={"lazy"} />
                                <Typography variant={"h6"}>{item.name}</Typography>
                                <div className={classes.CardContentInnerDiv}>
                                    <div>
                                        <Typography>{item.amount}</Typography>
                                        <Typography>€{item.price}</Typography>
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
