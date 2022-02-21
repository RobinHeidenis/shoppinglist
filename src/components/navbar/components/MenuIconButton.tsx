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
