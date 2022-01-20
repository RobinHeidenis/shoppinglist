import { IconButton } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MenuIconButtonProps } from "../../../interfaces/MenuIconButtonProps";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
    })
);

export function MenuIconButtonStart({ children, label, onClick }: MenuIconButtonProps) {
    const classes = useStyles();

    return (
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label={label} onClick={onClick}>
            {children}
        </IconButton>
    );
}
