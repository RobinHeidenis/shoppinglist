import { useContext } from "react";
import { ThemeContext } from "../../../themes/themeProvider";
import { Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        marginTop10: {
            marginTop: 10,
        },
    })
);

export function ThemeSettings() {
    const classes = useStyles();
    const { setThemeName, currentTheme } = useContext(ThemeContext);

    return (
        <Accordion className={classes.marginTop10}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Theme</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <RadioGroup name="theme" row value={currentTheme} onChange={(e) => setThemeName(e.target.value)}>
                    <FormControlLabel value={"lightTheme"} control={<Radio />} label="Light" />
                    <FormControlLabel value={"darkTheme"} control={<Radio />} label="Dark" />
                    <FormControlLabel value={"amoledTheme"} control={<Radio />} label="Amoled" />
                </RadioGroup>
            </AccordionDetails>
        </Accordion>
    );
}
