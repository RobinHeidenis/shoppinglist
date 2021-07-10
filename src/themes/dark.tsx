import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#102A43",
        },
        secondary: {
            main: "#aeee98",
        },
    },
});
