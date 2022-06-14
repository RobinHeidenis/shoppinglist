import { Skeleton } from "@mui/lab";
import { Divider, Typography } from "@mui/material";
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
