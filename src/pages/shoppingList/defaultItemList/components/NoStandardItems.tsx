import { Typography } from "@mui/material";
import React from "react";
import { createStyles, makeStyles } from "@mui/styles";

/**
 * Styles for the {@link NoStandardItems} functional component.
 */
const useStyles = makeStyles(() =>
    createStyles({
        typographyDiv: {
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
        },
    }),
);

/**
 * Functional Component <br/>
 *
 * Shows a message specifying that there are no standard items yet.
 * @constructor
 */
export const NoStandardItems = (): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.typographyDiv}>
            <Typography variant="h5">No standard items yet</Typography>
        </div>
    );
};
