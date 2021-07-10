import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        marginTop10: {
            marginTop: 10,
        },
    })
);

export function Changelog() {
    const classes = useStyles();

    return (
        <Accordion className={classes.marginTop10}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
    );
}
