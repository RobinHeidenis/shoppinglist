import {Skeleton} from "@material-ui/lab";
import {Card, CardContent, Typography} from "@material-ui/core";
import React from "react";

export default function LoadingSearch() {
    return (
        <Card style={{margin: "5px", width: '250px'}}>
            <CardContent style={{display: "flex", flexDirection: "column"}}>
                <Skeleton variant={"rect"} style={{alignSelf: "center"}} width={'200px'} height={'200px'}/>
                <Typography variant={'h6'}>
                    <Skeleton/>
                </Typography>
                <Typography style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between"
                }}>
                    <Typography>
                        <Skeleton width={'20px'}/>
                        <Skeleton width={'30px'}/>
                    </Typography>
                    <Skeleton width={'20px'}/>
                </Typography>
            </CardContent>
        </Card>
    )
}