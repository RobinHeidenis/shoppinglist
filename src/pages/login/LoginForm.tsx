import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavbarContext } from "../../contexts/NavbarContext";
import { useLoginMutation } from "../../slices/api/api.slice";
import { useAppDispatch } from "../../hooks/redux";
import { setCredentials } from "../../slices/auth/auth.slice";
import history from "../../components/lib/history";

const useStyles = makeStyles((theme) => ({
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
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginForm() {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const { setTitle } = useContext(NavbarContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setTitle("login");
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    // extract this handler to a func
                    onSubmit={async (event) => {
                        event.preventDefault();
                        try {
                            const tokens = await login({ username, password }).unwrap();
                            dispatch(setCredentials(tokens));
                            history.push("/");
                        } catch (e) {
                            //TODO: add toast notification here
                            console.error(e);
                        }
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        label="Username"
                        name="username"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        color={"secondary"}
                    />

                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        color={"secondary"}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}
