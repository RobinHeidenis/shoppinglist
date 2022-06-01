import React, { useContext } from "react";
import { Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "../../../themes/themeProvider";

const useStyles = makeStyles(() =>
    createStyles({
        marginTop10: {
            marginTop: 10,
        },
    }),
);

export const ThemeSettings = (): JSX.Element => {
    const classes = useStyles();
    const { setThemeName, currentTheme } = useContext(ThemeContext);

    // TODO: refactor this to use a dropdown menu

    return (
        <Accordion className={classes.marginTop10}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Theme</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <RadioGroup
                    name="theme"
                    row
                    value={currentTheme}
                    onChange={(e): void => {
                        setThemeName(e.target.value);
                    }}
                >
                    <FormControlLabel value="lightTheme" control={<Radio />} label="Light" />
                    <FormControlLabel value="darkTheme" control={<Radio />} label="Dark" />
                    <FormControlLabel value="amoledTheme" control={<Radio />} label="Amoled" />
                </RadioGroup>
            </AccordionDetails>
        </Accordion>
    );
};
