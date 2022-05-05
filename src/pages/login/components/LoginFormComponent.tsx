import { setCredentials } from "../../../slices/auth/auth.slice";
import history from "../../../components/lib/history";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { FormEvent, useState } from "react";
import { useLoginMutation } from "../../../slices/api/api.slice";
import { useAppDispatch } from "../../../hooks/redux";
import { makeStyles } from "@material-ui/core/styles";

/**
 * Styles for the {@link LoginFormComponent} functional component
 */
const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

/**
 * Functional Component <br/>
 *
 * Renders the login form, with two {@link TextField Text Fields}, and a submit {@link Button}. <br/>
 * Includes a function for submitting the form using {@link shoppingListApi RTK Query}.
 * @constructor
 */
export const LoginFormComponent = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Submits the form to the backend using {@link shoppingListApi RTK Query}. <br/>
     * If a successful response is received, adds the tokens to the persisted Redux slice and returns to the home page.
     * @param event
     */
    const submit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const tokens = await login({ username, password }).unwrap();
            dispatch(setCredentials(tokens));
            history.push("/");
        } catch (e) {
            //TODO: add toast notification here
            console.error(e);
        }
    };

    return (
        <form className={classes.form} noValidate onSubmit={submit}>
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
    );
};
