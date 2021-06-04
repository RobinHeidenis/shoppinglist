import React, {useCallback, useState} from 'react';
import './App.css';
import NavBar from "./components/AppBar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ShoppingList} from './pages/shoppingList/shoppingList';
import item from "./interfaces/item";
import {CssBaseline} from "@material-ui/core";
import BonusCard from "./pages/bonus/bonus";
import Settings from "./pages/settings/settings";
import Login from "./pages/login/login";
import {ShoppingListContext} from "./contexts/ShoppingListContext";

function App(): JSX.Element {
    const [items, setItems] = useState<item[]>([]);
    const [title, setTitle] = useState<string>("Shopping list");
    const [isOnItemList, setIsOnItemList] = useState(false);
    const [hasBackButton, setHasBackButton] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticate = useCallback( async (username: string, password: string) => {
        let status = false;
        await fetch('http://localhost:3001/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        }).then((r) => r.json().then(r => {
            if(!r.status) {
                localStorage.setItem("authToken", r.accessToken);
                localStorage.setItem("refreshToken", r.refreshToken);
                setIsAuthenticated(true);
                status = true;
            }
        }))
        return status;
    }, [setIsAuthenticated]);

    // @ts-ignore
    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={({ location }) => {
                return isAuthenticated
                    ? children
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />
            }} />
        )
    }

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
                        <PrivateRoute path="/settings">
                            <Settings setTitle={setTitle}/>
                        </PrivateRoute>
                        <Route path="/login">
                            <Login authenticateFunction={authenticate}/>
                        </Route>
                        <PrivateRoute exact path="/">
                            <ShoppingList items={items} setItems={setItems} setTitle={setTitle}
                                          setIsOnItemList={setIsOnItemList}/>
                        </PrivateRoute>
                    </Switch>
                </ShoppingListContext.Provider>
            </Router>
        </div>
    );
}

export default App;
