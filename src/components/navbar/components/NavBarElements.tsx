import { MenuButtons } from "./MenuButtons";
import { MenuTitle } from "./MenuTitle";
import { MenuBonusCardButton } from "./MenuBonusCardButton";
import { MenuMoreOptionsButton } from "./MenuMoreOptionsButton";
import { Toolbar } from "@material-ui/core";
import React, { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";

interface NavBarElementsProps {
    isOnItemList: boolean;
    setIsMenuOpen: (newValue: boolean) => void;
}

/**
 * Functional Component.
 *
 * Shows the internal elements of the nav bar.
 * Gets if the page has a back button from the {@link NavbarContext}.
 *
 * Only shows the "bonus card" button if `hasBackButton` is false.
 *
 * Only shows the "more options" button if `isOnItemList` is true
 *
 * @param isOnItemList - True if the currently selected page is the item list.
 * @param setIsMenuOpen - Function to open the drawer.
 */
export const NavBarElements = ({ isOnItemList, setIsMenuOpen }: NavBarElementsProps) => {
    const { hasBackButton } = useContext(NavbarContext);

    return (
        <Toolbar>
            <MenuButtons setIsMenuOpen={setIsMenuOpen} />
            <MenuTitle />
            {!hasBackButton && <MenuBonusCardButton />}
            {isOnItemList && <MenuMoreOptionsButton />}
        </Toolbar>
    );
};