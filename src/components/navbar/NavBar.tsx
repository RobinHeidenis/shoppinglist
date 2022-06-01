import { AppBar } from "@material-ui/core";
import React, { useContext, useMemo, useState } from "react";
import { SideBar } from "../SideBar/SideBar";
import { NavbarContext } from "../../contexts/NavbarContext";
import { NavBarElements } from "./components/NavBarElements";
import { SideBarContext } from "../../contexts/SideBarContext";

interface NavBarProps {
    isOnItemList: boolean;
}

/**
 * Functional Component.
 *
 * Renders the nav bar at the top of the screen.
 * Also renders a drawer on the left side of the screen when the `isMenuOpen` property is true.
 * The drawer only gets placed in the page if `hasBackButton` is falsy.
 * Uses internal state to control the opening of the drawer.
 *
 * @param isOnItemList - True if the currently selected page is the item list.
 */
export const NavBar = ({ isOnItemList }: NavBarProps): JSX.Element => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const { hasBackButton } = useContext(NavbarContext);

    const navBarContextValues = useMemo(
        () => ({
            isDrawerOpen,
            setIsDrawerOpen,
        }),
        [isDrawerOpen, setIsDrawerOpen],
    );

    return (
        <SideBarContext.Provider value={navBarContextValues}>
            <AppBar position="sticky">
                <NavBarElements isOnItemList={isOnItemList} />
            </AppBar>
            {!hasBackButton && <SideBar />}
        </SideBarContext.Provider>
    );
};
