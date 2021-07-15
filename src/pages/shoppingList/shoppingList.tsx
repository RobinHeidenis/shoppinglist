import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import Search from "./search";
import ItemList from "./itemList";
import DefaultItemList from "./defaultItemList";
import { NavbarContext } from "../../contexts/NavbarContext";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BottomNavContext } from "../../contexts/BottomNavContext";
import { SearchContext } from "../../contexts/SearchContext";
import { EditContext } from "../../contexts/EditContext";
import { Item } from "../../interfaces/item";

interface ShoppingListProps {
    setIsOnItemList: (newValue: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bottomNavigation: {
            position: "fixed",
            bottom: 0,
            width: "100%",
        },
        root: {
            "&$selected": {
                color: theme.palette.secondary.main,
            },
        },
        selected: {},
    })
);

const useStylesForBottomNav = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "&$selected": {
                color: theme.palette.secondary.main,
            },
        },
        selected: {},
    })
);

export function ShoppingList({ setIsOnItemList }: ShoppingListProps) {
    const classes = useStyles();
    const styleForBottomNav = useStylesForBottomNav();
    const [bottomNavValue, setBottomNavValue] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState({
        id: 0,
        name: "",
        quantity: "",
        url: "",
        status: 0,
    } as Item);
    const { setTitle } = useContext(NavbarContext);

    useEffect(() => setTitle("Shopping list"), []);

    return (
        <div>
            <BottomNavContext.Provider value={{ bottomNavValue, setBottomNavValue }}>
                <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                    <EditContext.Provider
                        value={{ isEditing, setIsEditing, editingItem, setEditingItem, isEditDialogOpen, setIsEditDialogOpen }}
                    >
                        {bottomNavValue === 2 && <Search />}
                        {bottomNavValue === 1 && <ItemList setIsOnItemList={setIsOnItemList} />}
                        {bottomNavValue === 0 && <DefaultItemList />}

                        <BottomNavigation
                            value={bottomNavValue}
                            onChange={(event, newValue) => setBottomNavValue(newValue)}
                            showLabels
                            className={classes.bottomNavigation}
                        >
                            <BottomNavigationAction label="Standard" icon={<PostAddIcon />} classes={styleForBottomNav} />
                            <BottomNavigationAction label="List" icon={<ListIcon />} classes={styleForBottomNav} />
                            <BottomNavigationAction label="Search" icon={<SearchIcon />} classes={styleForBottomNav} />
                        </BottomNavigation>
                    </EditContext.Provider>
                </SearchContext.Provider>
            </BottomNavContext.Provider>
        </div>
    );
}
