import { Theme } from "@material-ui/core/styles";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { amoledTheme } from "./amoled";

// TODO: make type for theme.
const themeMap: { [key: string]: Theme } = {
    lightTheme,
    darkTheme,
    amoledTheme,
};

export function getThemeByName(theme: string): Theme {
    return themeMap[theme];
}


