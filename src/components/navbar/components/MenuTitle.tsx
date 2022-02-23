import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            flexGrow: 1,
        },
    })
);

export const MenuTitle = () => {
    const classes = useStyles();
    const { title } = useContext(NavbarContext);

    return (
        <Typography variant="h6" className={classes.title}>
            {title}
        </Typography>
    );
};
