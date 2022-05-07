import React, { useState } from "react";
import { Route, Router } from "react-router-dom";
import history from "../components/lib/history";
import { NavBar } from "../components/navbar/NavBar";
import { BonusCard } from "../pages/bonus/bonus";
import { Settings } from "../pages/settings/settings";
import { LoginPage } from "../pages/login/LoginPage";
import { ShoppingList } from "../pages/shoppingList/shoppingList";
import { PrivateRoute } from "./PrivateRoute";

/**
 * Functional Component.<br/>
 *
 * The main router for the application.
 * Renders the correct component based on the url.<br/>
 *
 * Uses {@link Router} from `react-router-dom`
 * @constructor
 */
export const Routes = (): JSX.Element => {
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
                <LoginPage />
            </Route>
            <PrivateRoute path="/" exact>
                <ShoppingList setIsOnItemList={setIsOnItemList} />
            </PrivateRoute>
        </Router>
    );
};
