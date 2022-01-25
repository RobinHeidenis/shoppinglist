import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import { Route, Router } from "react-router-dom";
import { ShoppingList } from "./pages/shoppingList/shoppingList";
import { CssBaseline } from "@material-ui/core";
import BonusCard from "./pages/bonus/bonus";
import Settings from "./pages/settings/settings";
import LoginForm from "./pages/login/LoginForm";
import history from "./components/lib/history";
import { NavbarContext } from "./contexts/NavbarContext";
import { setupEventSource } from "./app/eventSource";
import { store } from "./app/store";

function App(): JSX.Element {
    const [isOnItemList, setIsOnItemList] = useState(false);
    const [hasBackButton, setHasBackButton] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        let es = setupEventSource(store);
        es.onerror = () => (es = setupEventSource(store));

        return () => {
            if (es.readyState && es.readyState === 1) es.close();
        };
    }, []);

    return (
        <div>
            <CssBaseline />
            <NavbarContext.Provider value={{ title, setTitle, hasBackButton, setHasBackButton }}>
                <Router history={history}>
                    <NavBar isOnItemList={isOnItemList} />
                    <Route path="/bonuscard" exact>
                        <BonusCard />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route exact path="/">
                        <ShoppingList setIsOnItemList={setIsOnItemList} />
                    </Route>
                </Router>
            </NavbarContext.Provider>
        </div>
    );
}

export default App;
