import { Skeleton } from "@material-ui/lab";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    card: {
        margin: 5,
        width: 250,
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
    },
    skeleton: {
        alignSelf: "center",
    },
    typography: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
}));

export const LoadingSearch = (): JSX.Element => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Skeleton variant="rect" className={classes.skeleton} width="200px" height="200px" />
                <Typography variant="h6">
                    <Skeleton />
                </Typography>
                <div className={classes.typography}>
                    <div>
                        <Skeleton width="20px" />
                        <Skeleton width="30px" />
                    </div>
                    <Skeleton width="20px" />
                </div>
            </CardContent>
        </Card>
    );
};
