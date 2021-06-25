import React, {useEffect} from "react";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import PostAddIcon from '@material-ui/icons/PostAdd';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import Search from "../search/search";
import ItemList from "./itemList";
import DefaultItemList from "./defaultItemList";

interface propsInterface {
    setTitle: (newValue: string) => void
    setIsOnItemList: (newValue: boolean) => void
}

export function ShoppingList({setTitle, setIsOnItemList}: propsInterface): JSX.Element {
    const [bottomNavValue, setBottomNavValue] = React.useState(1);

    useEffect(() => setTitle("Shopping list"));

    return (
        <div>
            {bottomNavValue === 2 ? <Search/> : null}
            {bottomNavValue === 1 ?
                <ItemList setIsOnItemList={setIsOnItemList}/> : null}
            {bottomNavValue === 0 ? <DefaultItemList/> : null}


            <BottomNavigation
                value={bottomNavValue}
                onChange={(event, newValue) => {
                    setBottomNavValue(newValue);
                }}
                showLabels
                style={{position: "fixed", bottom: 0, width: "100%"}}
            >
                <BottomNavigationAction label="Standard" icon={<PostAddIcon/>}/>
                <BottomNavigationAction label="List" icon={<ListIcon/>}/>
                <BottomNavigationAction label="Search" icon={<SearchIcon/>}/>
            </BottomNavigation>
        </div>
    )
}
