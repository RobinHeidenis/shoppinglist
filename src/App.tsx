import React, {useState} from 'react';
import './App.css';
import NavBar from "./components/AppBar";
import {Route, Router} from "react-router-dom";
import {ShoppingList} from './pages/shoppingList/shoppingList';
import item from "./interfaces/item";
import {CssBaseline} from "@material-ui/core";
import BonusCard from "./pages/bonus/bonus";
import Settings from "./pages/settings/settings";
import {ShoppingListContext} from "./contexts/ShoppingListContext";
import LoginForm from "./pages/login/LoginForm";
import history from "./components/lib/history";

function App(): JSX.Element {
    const [items, setItems] = useState<item[]>([]);
    const [title, setTitle] = useState<string>("Shopping list");
    const [isOnItemList, setIsOnItemList] = useState(false);
    const [hasBackButton, setHasBackButton] = useState(false);

    return (
        <div>
            <CssBaseline/>
            <ShoppingListContext.Provider value={{ items, setItems }}>
                <NavBar title={title} isOnItemList={isOnItemList}
                        hasBackButton={hasBackButton}/>
                <Router history={history}>
                    <Route path="/bonuscard" exact>
                        <BonusCard setTitle={setTitle} setHasBackButton={setHasBackButton}/>
                    </Route>
                    <Route path="/settings">
                        <Settings setTitle={setTitle}/>
                    </Route>
                    <Route path="/login">
                        <LoginForm/>
                    </Route>
                    <Route exact path="/">
                        <ShoppingList items={items} setItems={setItems} setTitle={setTitle}
                                      setIsOnItemList={setIsOnItemList}/>
                    </Route>
                </Router>
            </ShoppingListContext.Provider>
        </div>
    );
}

export default App;
