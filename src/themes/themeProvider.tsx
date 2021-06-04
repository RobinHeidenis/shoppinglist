import React, {useState} from 'react';
import {MuiThemeProvider} from "@material-ui/core";
import {getThemeByName} from "./themeSwitcher";

export const ThemeContext = React.createContext({
    setThemeName: (themeName: string): void => {
    }, currentTheme: "darkTheme"
});

const ThemeProvider: React.FC = (props) => {
    const curThemeName = localStorage.getItem("appTheme") || "darkTheme";

    // State to hold the selected theme name
    const [themeName, _setThemeName] = useState(curThemeName);

    const setThemeName = (themeName: string): void => {
        localStorage.setItem("appTheme", themeName);
        _setThemeName(themeName);
    }

    // Retrieve the theme object by theme name
    const theme = getThemeByName(themeName);

    return (
        <ThemeContext.Provider value={{setThemeName: setThemeName, currentTheme: curThemeName}}>
            <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;