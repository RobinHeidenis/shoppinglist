/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
import { Action, Dispatch, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import history from "../../components/lib/history";
import { setCredentials } from "../../slices/auth/auth.slice";

export const rtkQueryErrorLogger: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next: Dispatch) =>
    (action: Action): Action => {
        if (isRejectedWithValue(action)) {
            if (
                // @ts-expect-error redux is difficult with action types, so we need to just assume here
                action.payload.status === 400 &&
                // @ts-expect-error
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                action.payload.data.message === "No bearer token was sent with the request"
            ) {
                history.push("/login");
            }
            // @ts-expect-error
            if (action.payload.status === 403) {
                dispatch(setCredentials({ accessToken: null, refreshToken: null }));
                history.push("/login");
            }
        }

        return next(action);
    };
