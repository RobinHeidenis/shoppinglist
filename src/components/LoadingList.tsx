import {Skeleton} from "@material-ui/lab";
import {Divider, Typography} from "@material-ui/core";
import React from "react";

export default function LoadingList() {
    return (
        <Typography variant={"h2"}>
            <Skeleton/>
            <Divider/>
            <Skeleton/>
            <Divider/>
            <Skeleton/>
            <Divider/>
        </Typography>
    )
}