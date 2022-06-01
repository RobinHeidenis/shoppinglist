import { Skeleton } from "@material-ui/lab";
import { Divider, Typography } from "@material-ui/core";
import React from "react";

export const LoadingList = (): JSX.Element => (
        <Typography variant="h2">
            <Skeleton />
            <Divider />
            <Skeleton />
            <Divider />
            <Skeleton />
            <Divider />
        </Typography>
    );
