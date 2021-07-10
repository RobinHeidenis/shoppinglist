import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

export const amoledTheme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: "#000",
        },
        primary: {
            main: "#102A43",
        },
        secondary: {
            main: "#aeee98",
        },
    },
});
