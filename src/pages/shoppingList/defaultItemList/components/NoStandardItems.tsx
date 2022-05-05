import { Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        typographyDiv: {
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
        },
    })
);

export const NoStandardItems = () => {
    const classes = useStyles();

    return (
        <div className={classes.typographyDiv}>
            <Typography variant={"h5"}>No standard items yet</Typography>
        </div>
    );
};
