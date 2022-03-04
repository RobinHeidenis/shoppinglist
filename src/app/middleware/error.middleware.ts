import { isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import history from "../../components/lib/history";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.warn("We got a rejected action!");
        console.log(action.payload);
        if (action.payload.status === 400 && action.payload.data.message === "No bearer token was sent with the request") {
            console.log("Session token is not here, sending back to login page");
            history.push("/login");
        }
    }

    return next(action);
};
