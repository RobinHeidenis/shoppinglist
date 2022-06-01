import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { getThemeByName } from "./themeSwitcher";

interface ThemeContextDefaultValues {
    setThemeName: (newValue: string) => void;
    currentTheme: string;
}

export const ThemeContext = React.createContext<ThemeContextDefaultValues>({
    setThemeName: (): void => {
        // Initial function does nothing, but has to adhere to the typing
    },
    currentTheme: "darkTheme",
});

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const currentThemeName = localStorage.getItem("appTheme") || "darkTheme";

    const [themeName, setStateThemeName] = useState(currentThemeName);

    const setThemeName = useCallback(
        (theme: string): void => {
            localStorage.setItem("appTheme", theme);
            setStateThemeName(theme);
        },
        [setStateThemeName],
    );

    const theme = getThemeByName(themeName);

    const themeContextProviderValues = useMemo(
        () => ({
            setThemeName,
            currentTheme: currentThemeName,
        }),
        [setThemeName, currentThemeName],
    );

    return (
        <ThemeContext.Provider value={themeContextProviderValues}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
