import React, { useState } from "react";
import { NavBar } from "./components/navbar/NavBar";
import { Route, Router } from "react-router-dom";
import { ShoppingList } from "./pages/shoppingList/shoppingList";
import { CssBaseline } from "@material-ui/core";
import BonusCard from "./pages/bonus/bonus";
import Settings from "./pages/settings/settings";
import LoginForm from "./pages/login/LoginForm";
import history from "./components/lib/history";
import { NavbarContext } from "./contexts/NavbarContext";

/**
 * Functional Component.<br/>
 *
 * The main App component.<br/>
 * Has the main router, which renders the different 'pages'.
 * Also includes the navbar, sidebar, and a CSS Baseline to allow custom styles without compatibility issues.
 * @constructor
 */
const App = (): JSX.Element => {
    const [isOnItemList, setIsOnItemList] = useState(false);
    const [hasBackButton, setHasBackButton] = useState(false);
    const [title, setTitle] = useState("");

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
};

export default App;
