import React, { useContext, useEffect, useMemo, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Search } from "./search";
import { ItemList } from "./itemList";
import { StandardItemList } from "./defaultItemList/StandardItemList";
import { NavbarContext } from "../../contexts/NavbarContext";
import { BottomNavContext } from "../../contexts/BottomNavContext";
import { SearchContext } from "../../contexts/SearchContext";
import { EditContext } from "../../contexts/EditContext";
import { Item } from "../../interfaces/item";

interface ShoppingListProps {
    setIsOnItemList: (newValue: boolean) => void;
}

/**
 * Styles for the {@link ShoppingList} functional component.
 */
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
    }),
);

/**
 * Styles for the {@link BottomNavigationAction} component.
 */
const useStylesForBottomNav = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "&$selected": {
                color: theme.palette.secondary.main,
            },
        },
        selected: {},
    }),
);

export const ShoppingList = ({ setIsOnItemList }: ShoppingListProps): JSX.Element => {
    const classes = useStyles();
    const styleForBottomNav = useStylesForBottomNav();
    const [bottomNavValue, setBottomNavValue] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item>({
        id: 0,
        name: "",
        quantity: "",
        url: "",
        status: 1,
        sequence: 0,
    });
    const { setTitle } = useContext(NavbarContext);

    useEffect(() => {
        setTitle("Shopping list");
    }, [setTitle]);

    const bottomNavContextValues = useMemo(
        () => ({
            bottomNavValue,
            setBottomNavValue,
        }),
        [bottomNavValue, setBottomNavValue],
    );

    const searchContextValues = useMemo(() => ({ searchValue, setSearchValue }), [searchValue, setSearchValue]);

    const editContextValues = useMemo(
        () => ({
            isEditing,
            setIsEditing,
            editingItem,
            setEditingItem,
            isEditDialogOpen,
            setIsEditDialogOpen,
        }),
        [isEditing, setIsEditing, editingItem, setEditingItem, isEditDialogOpen, setIsEditDialogOpen],
    );

    return (
        <div>
            <BottomNavContext.Provider value={bottomNavContextValues}>
                <SearchContext.Provider value={searchContextValues}>
                    <EditContext.Provider value={editContextValues}>
                        {bottomNavValue === 2 && <Search />}
                        {bottomNavValue === 1 && <ItemList setIsOnItemList={setIsOnItemList} />}
                        {bottomNavValue === 0 && <StandardItemList />}

                        <BottomNavigation
                            value={bottomNavValue}
                            onChange={(event, newValue): void => {
                                setBottomNavValue(newValue as number);
                            }}
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
};
