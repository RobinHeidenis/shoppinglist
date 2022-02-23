import { AppBar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SwipeableTemporaryDrawer from "./SideBar";
import { NavbarContext } from "../../contexts/NavbarContext";
import { NavBarElements } from "./components/NavBarElements";

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
export default function NavBar({ isOnItemList }: NavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { hasBackButton } = useContext(NavbarContext);

    return (
        <>
            <AppBar position={"sticky"}>
                <NavBarElements isOnItemList={isOnItemList} setIsMenuOpen={setIsMenuOpen} />
            </AppBar>
            {!hasBackButton && <SwipeableTemporaryDrawer updateMenuState={setIsMenuOpen} menuOpen={isMenuOpen} />}
        </>
    );
}
