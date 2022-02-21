import { IconButton } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MenuIconButtonProps } from "../../../interfaces/MenuIconButtonProps";

/**
 * Styles
 *
 * Returns the styles for the {@link MenuIconButton} component.
 * Is used for margin on the component.
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
    })
);

/**
 * Functional Component
 *
 * Takes children, a label, an onClick handler, and if the button is at the end or not.
 * Returns a menu icon button with certain properties set.
 * Will change classes based on if the end boolean is set or not.
 * @param children
 * @param label
 * @param onClick
 * @param end
 * @constructor
 */
export const MenuIconButton = ({ children, label, onClick, end }: MenuIconButtonProps) => {
    const classes = useStyles();

    return (
        <IconButton
            edge={end ? "end" : "start"}
            className={!end ? classes.menuButton : ""}
            color="inherit"
            aria-label={label}
            onClick={onClick}
        >
            {children}
        </IconButton>
    );
};
