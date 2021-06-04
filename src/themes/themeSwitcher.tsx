import {lightTheme} from './light'
import {darkTheme} from './dark'
import {amoledTheme} from "./amoled";
import {Theme} from "@material-ui/core/styles";

export function getThemeByName(theme: string): Theme {
    return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
    lightTheme,
    darkTheme,
    amoledTheme
};