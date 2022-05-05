import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

// This isn't a React component, file extension shouldn't be `tsx`
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
