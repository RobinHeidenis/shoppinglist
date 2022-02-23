import { AppBar, Toolbar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SwipeableTemporaryDrawer from "./SideBar";
import { NavbarContext } from "../../contexts/NavbarContext";
import { MenuButtons } from "./components/MenuButtons";
import { MenuTitle } from "./components/MenuTitle";
import { MenuBonusCardButton } from "./components/MenuBonusCardButton";
import { MenuMoreOptionsButton } from "./components/MenuMoreOptionsButton";

interface NavBarProps {
    isOnItemList: boolean;
}

export default function NavBar({ isOnItemList }: NavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { hasBackButton } = useContext(NavbarContext);

    return (
        <>
            <AppBar position={"sticky"}>
                <Toolbar>
                    <MenuButtons setIsMenuOpen={setIsMenuOpen} />
                    <MenuTitle />
                    {!hasBackButton && <MenuBonusCardButton />}
                    {isOnItemList && <MenuMoreOptionsButton />}
                </Toolbar>
            </AppBar>
            {!hasBackButton && <SwipeableTemporaryDrawer updateMenuState={setIsMenuOpen} menuOpen={isMenuOpen} />}
        </>
    );
}
