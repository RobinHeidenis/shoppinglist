import history from "../components/lib/history";
import { NavBar } from "../components/navbar/NavBar";
import { Route, Router } from "react-router-dom";
import BonusCard from "../pages/bonus/bonus";
import Settings from "../pages/settings/settings";
import LoginForm from "../pages/login/LoginForm";
import { ShoppingList } from "../pages/shoppingList/shoppingList";
import React, { useState } from "react";

/**
 * Functional Component.<br/>
 *
 * The main router for the application.
 * Renders the correct component based on the url.<br/>
 *
 * Uses {@link Router} from `react-router-dom`
 * @constructor
 */
export const Routes = () => {
    // missing return type - my name is ESLint btw
    const [isOnItemList, setIsOnItemList] = useState(false);

    return (
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
    );
};
