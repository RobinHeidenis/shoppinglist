import React, { useContext, useEffect } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import { Changelog } from "./components/Changelog";

export const Settings = (): JSX.Element => {
    const { setTitle } = useContext(NavbarContext);

    useEffect(() => {
        setTitle("Settings");
    }, [setTitle]);
    return (
        <main>
            <Changelog />
        </main>
    );
};
