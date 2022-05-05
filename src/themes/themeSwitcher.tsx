import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { amoledTheme } from "./amoled";
import { Theme } from "@material-ui/core/styles";

// string bad - could result in undefined if themeMap doesn't contain theme
export function getThemeByName(theme: string): Theme {
    return themeMap[theme];
}

// type these better, string is too generic
const themeMap: { [key: string]: Theme } = {
    lightTheme,
    darkTheme,
    amoledTheme,
};
