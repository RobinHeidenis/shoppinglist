import { Toolbar } from "@material-ui/core";
import React, { useContext } from "react";
import { MenuButtons } from "./MenuButtons";
import { MenuTitle } from "./MenuTitle";
import { MenuBonusCardButton } from "./MenuBonusCardButton";
import { MenuMoreOptionsButton } from "./MenuMoreOptionsButton";
import { NavbarContext } from "../../../contexts/NavbarContext";

interface NavBarElementsProps {
    isOnItemList: boolean;
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
 */
export const NavBarElements = ({ isOnItemList }: NavBarElementsProps): JSX.Element => {
    const { hasBackButton } = useContext(NavbarContext);

    return (
        <Toolbar>
            <MenuButtons />
            <MenuTitle />
            {!hasBackButton && <MenuBonusCardButton />}
            {isOnItemList && <MenuMoreOptionsButton />}
        </Toolbar>
    );
};
