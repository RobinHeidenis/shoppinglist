import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";
import { NavbarContext } from "../../contexts/NavbarContext";
import { LoginFormComponent } from "./components/LoginFormComponent";

/**
 * Styles for the {@link LoginPage} functional component
 */
const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

/**
 * Functional Component <br/>
 *
 * Shows the page / wrapper for the login form. <br/>
 *
 * Uses the {@link NavbarContext} to change the header title to "Login".
 * @constructor
 */
export const LoginPage = (): JSX.Element => {
    const classes = useStyles();
    const { setTitle } = useContext(NavbarContext);

    /**
     * Changes the title in the header to "login"
     */
    useEffect(() => {
        setTitle("login");
    }, [setTitle]);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <LoginFormComponent />
            </div>
        </Container>
    );
};
