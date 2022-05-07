/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
import { Action, Dispatch, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import history from "../../components/lib/history";

export const rtkQueryErrorLogger: Middleware =
    (_: MiddlewareAPI) =>
    (next: Dispatch) =>
    (action: Action): Action => {
        if (isRejectedWithValue(action)) {
            if (
                // @ts-expect-error redux is difficult with action types, so we need to just assume here
                (action.payload.status === 400 &&
                    // @ts-expect-error
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    action.payload.data.message === "No bearer token was sent with the request") ||
                // @ts-expect-error
                action.payload.status === 403
            ) {
                history.push("/login");
            }
        }

        return next(action);
    };
