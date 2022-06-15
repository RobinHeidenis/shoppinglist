import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Theme } from "@mui/material/styles";
import React, { FormEvent, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Redirect, useLocation } from "react-router-dom";
import { setCredentials } from "../../../slices/auth/auth.slice";
import { useLoginMutation } from "../../../slices/api/api.slice";
import { useAppDispatch } from "../../../hooks/redux";

/**
 * Styles for the {@link LoginFormComponent} functional component
 */
const useStyles = makeStyles((theme: Theme) => ({
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
export const LoginFormComponent = (): JSX.Element => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const { state } = useLocation();

    /**
     * Submits the form to the backend using {@link shoppingListApi RTK Query}. <br/>
     * If a successful response is received, adds the tokens to the persisted Redux slice and returns to the home page.
     * @param event
     */
    const submit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            const tokens = await login({ username, password }).unwrap();
            dispatch(setCredentials(tokens));
            setRedirectToReferrer(true);
        } catch (e) {
            // TODO: add toast notification here
        }
    };

    if (redirectToReferrer) return <Redirect to={(state as { from?: string | undefined } | undefined)?.from || "/"} />;

    return (
        // We have to use a promise, as we do not have control over the login function above.
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className={classes.form} noValidate onSubmit={async (event): Promise<void> => submit(event)}>
            <TextField
                required
                fullWidth
                autoFocus
                margin="normal"
                variant="outlined"
                label="Username"
                name="username"
                autoComplete="off"
                onChange={(e): void => {
                    setUsername(e.target.value);
                }}
                value={username}
                color="secondary"
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
                onChange={(e): void => {
                    setPassword(e.target.value);
                }}
                color="secondary"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign In
            </Button>
        </form>
    );
};
