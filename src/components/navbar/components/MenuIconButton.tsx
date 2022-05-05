import { IconButton } from "@material-ui/core";
import React, { ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    }),
);

export interface MenuIconButtonProps {
    children: ReactNode;
    label: string;
    onClick: (event: React.MouseEvent) => void;
    end?: boolean;
}

/**
 * Functional Component.
 *
 * Takes children, a label, an onClick handler, and if the button is at the end or not.
 * Returns a menu icon button with certain properties set.
 * Will change classes based on if the end boolean is set or not.
 *
 * @param children - The React Nodes to be shown inside the {@link IconButton}.
 * @param label - The label for the {@link IconButton}
 * @param onClick - Function that gets called when a user clicks on the button
 * @param end - Boolean that specifies if the button should position itself at the end of the container.
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
