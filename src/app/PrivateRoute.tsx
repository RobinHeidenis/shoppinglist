import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface PrivateRouteProps extends RouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps): JSX.Element => {
    const token = useAppSelector((state) => state.persistedReducer.accessToken);

    return <Route {...rest} render={(): JSX.Element => (token ? children : <Redirect to={{ pathname: "/login" }} />)} />;
};
