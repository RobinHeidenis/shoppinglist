import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ThemeContext} from '../../themes/themeProvider'
import {useContext, useEffect} from "react";

interface props {
    setTitle: (newValue: string) => void
}

export default function Settings(props: props) {
    const {setThemeName, currentTheme} = useContext(ThemeContext)

    useEffect(() => props.setTitle("Settings"));

    return (
        <>
            <Accordion style={{marginTop: "10px"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Changelog</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography>30-04-2021</Typography>
                        <ul>
                            <li>Fixed bug with dragging to reorder</li>
                            <li>Added feedback for adding standard items to shopping list</li>
                            <li>Added confirmation dialog when removing standard item</li>
                            <li>Added potential fix for chrome showing suggestions in add item dialog</li>
                            <li>Changed cancel button behaviour to empty form fields in add item dialog</li>
                        </ul>
                        <Typography>23-04-2021</Typography>
                        <ul>
                            <li>Added standard item list implementation</li>
                            <li>Fixed items in long list being overlapped by bottom navigation bar</li>
                            <li>Added word breaking for long item names</li>
                            <li>Populated standard item list</li>
                            <li>Fixed backend bugs</li>
                            <li>Implemented remove all items (you can find this feature in the three dots)</li>
                            <li>Added conditional showing of bonuscard button and three dots</li>
                            <li>Added back button to bonuscard page</li>
                            <li>Added loading indicator to search page</li>
                        </ul>
                        <Typography>19-04-2021</Typography>
                        <ul>
                            <li>Added search</li>
                            <li>Fixed title bugs</li>
                            <li>Added bottom app bar</li>
                            <li>Fixed search bugs</li>
                            <li>Updated navigation flow</li>
                        </ul>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion style={{marginTop: "10px"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Theme</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup name="theme" row value={currentTheme} onChange={(e) => {
                        setThemeName(e.target.value)
                    }}>
                        <FormControlLabel value={"lightTheme"} control={<Radio/>} label="Light"/>
                        <FormControlLabel value={"darkTheme"} control={<Radio/>} label="Dark"/>
                        <FormControlLabel value={"amoledTheme"} control={<Radio/>} label="Amoled"/>
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>
        </>
    )
}