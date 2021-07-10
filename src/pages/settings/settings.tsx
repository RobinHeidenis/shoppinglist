import { useContext, useEffect } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import { Changelog } from "../../components/Changelog";
import { ThemeSettings } from "../../components/ThemeSettings";

export default function Settings() {
    const { setTitle } = useContext(NavbarContext);

    useEffect(() => setTitle("Settings"), []);
    return (
        <main>
            <Changelog />
            <ThemeSettings />
        </main>
    );
}
