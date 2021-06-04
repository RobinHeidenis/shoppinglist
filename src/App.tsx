import React, {useState} from 'react';
import './App.css';
import NavBar from "./components/AppBar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ShoppingList} from './pages/shoppingList/shoppingList';
import item from "./interfaces/item";
import {CssBaseline} from "@material-ui/core";
import BonusCard from "./pages/bonus/bonus";
import Settings from "./pages/settings/settings";
import {ShoppingListContext} from "./contexts/ShoppingListContext";
import LoginForm from "./pages/login/LoginForm";

function App(): JSX.Element {
    const [items, setItems] = useState<item[]>([]);
    const [title, setTitle] = useState<string>("Shopping list");
    const [isOnItemList, setIsOnItemList] = useState(false);
    const [hasBackButton, setHasBackButton] = useState(false);

    return (
        <div>
            <CssBaseline/>
            <Router>
                <ShoppingListContext.Provider value={{ items, setItems }}>
                    <NavBar title={title} isOnItemList={isOnItemList}
                            hasBackButton={hasBackButton}/>
                    <Switch>
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
                    </Switch>
                </ShoppingListContext.Provider>
            </Router>
        </div>
    );
}

export default App;
