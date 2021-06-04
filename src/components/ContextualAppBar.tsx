import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, {FC, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import history from "./lib/history";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

export const ContextualAppBar: FC = (): JSX.Element => {
    const classes = useStyles();
    const [title, setTitle] = useState<string>("Add item");

    const goBackToPreviousPage = (): void => {
        history.push("/");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={() => {
                                    goBackToPreviousPage();
                                }}>
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};
