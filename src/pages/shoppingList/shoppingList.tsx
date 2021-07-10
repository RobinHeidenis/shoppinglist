import React, { useContext, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import Search from "./search";
import ItemList from "./itemList";
import DefaultItemList from "./defaultItemList";
import { NavbarContext } from "../../contexts/NavbarContext";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

export function ShoppingList({ setIsOnItemList }: ShoppingListProps) {
    const classes = useStyles();
    const [bottomNavValue, setBottomNavValue] = React.useState(1);
    const { setTitle } = useContext(NavbarContext);

    useEffect(() => setTitle("Shopping list"), []);

    return (
        <div>
            {bottomNavValue === 2 && <Search />}
            {bottomNavValue === 1 && <ItemList setIsOnItemList={setIsOnItemList} />}
            {bottomNavValue === 0 && <DefaultItemList />}

            <BottomNavigation
                value={bottomNavValue}
                onChange={(event, newValue) => setBottomNavValue(newValue)}
                showLabels
                className={classes.bottomNavigation}
            >
                <BottomNavigationAction label="Standard" icon={<PostAddIcon />} classes={classes} />
                <BottomNavigationAction label="List" icon={<ListIcon />} classes={classes} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} classes={classes} />
            </BottomNavigation>
        </div>
    );
}
