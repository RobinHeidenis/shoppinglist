import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { NavbarContext } from "../../../contexts/NavbarContext";

/**
 * Styles
 *
 * Returns the styles for the {@link MenuTitle} component.
 */
const useStyles = makeStyles(() =>
    createStyles({
        title: {
            flexGrow: 1,
        },
    }),
);

/**
 * Functional Component. <br/>
 *
 * Gets the title of the page from the {@link NavbarContext} and renders this in a MUI {@link typography}.
 * Has the flexGrow property, to allow it to grow to the maximum possible space in the nav bar.
 * @constructor
 */
export const MenuTitle = (): JSX.Element => {
    const classes = useStyles();
    const { title } = useContext(NavbarContext);

    return (
        <Typography variant="h6" className={classes.title}>
            {title}
        </Typography>
    );
};
