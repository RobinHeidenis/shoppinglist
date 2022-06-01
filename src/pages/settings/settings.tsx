import React, { useContext, useEffect } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import { Changelog } from "./components/Changelog";
import { ThemeSettings } from "./components/ThemeSettings";

export const Settings = (): JSX.Element => {
    const { setTitle } = useContext(NavbarContext);

    useEffect(() => { setTitle("Settings"); }, [setTitle]);
    return (
        <main>
            <Changelog />
            <ThemeSettings />
        </main>
    );
};
