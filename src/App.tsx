import React, { useMemo, useState } from "react";
import { createTheme, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { NavbarContext } from "./contexts/NavbarContext";
import { Routes } from "./app/Routes";

const getDesignTokens = (mode: PaletteMode): Record<string, unknown> => ({
    palette: {
        mode,
        ...(mode === "dark" && {
            primary: {
                main: "#102A43",
            },
            secondary: {
                main: "#aeee98",
            },
        }),
    },
});

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

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")), [prefersDarkMode]);

    const navBarContextValues = useMemo(
        () => ({
            title,
            setTitle,
            hasBackButton,
            setHasBackButton,
        }),
        [title, setTitle, hasBackButton, setHasBackButton],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavbarContext.Provider value={navBarContextValues}>
                <Routes />
            </NavbarContext.Provider>
        </ThemeProvider>
    );
};

export default App;
