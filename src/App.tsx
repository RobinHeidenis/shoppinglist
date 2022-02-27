import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { NavbarContext } from "./contexts/NavbarContext";
import { Routes } from "./app/Routes";

/**
 * Functional Component.<br/>
 *
 * The main App component.<br/>
 * Has the main router, which renders the different 'pages'.
 * Also includes the navbar, sidebar, and a CSS Baseline to allow custom styles without compatibility issues.
 * @constructor
 */
const App = (): JSX.Element => {
    const [hasBackButton, setHasBackButton] = useState(false);
    const [title, setTitle] = useState("");

    return (
        <div>
            <CssBaseline />
            <NavbarContext.Provider value={{ title, setTitle, hasBackButton, setHasBackButton }}>
                <Routes />
            </NavbarContext.Provider>
        </div>
    );
};

export default App;
