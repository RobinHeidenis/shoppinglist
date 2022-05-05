import { createStyles, makeStyles } from "@material-ui/core/styles";
import { EmptyCartSVG } from "../../../../../components/svg/EmptyCartSVG";
import { Typography } from "@material-ui/core";
import React from "react";

/**
 * Styles for the {@link NoItems} functional component.
 */
const useStyles = makeStyles(() =>
    createStyles({
        emptyShoppingListDiv: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            flexDirection: "column",
            height: "65vh",
        },
        svg: {
            width: "50%",
            height: "50%",
        },
    })
);

/**
 * Functional Component <br/>
 *
 * Renders an empty cart image and text that specifies no items are on the list.
 * @constructor
 */
export const NoItems = () => {
    const classes = useStyles();

    return (
        <div className={classes.emptyShoppingListDiv}>
            <EmptyCartSVG className={classes.svg} />
            <Typography variant={"h5"}>Your shopping list is empty!</Typography>
        </div>
    );
};
