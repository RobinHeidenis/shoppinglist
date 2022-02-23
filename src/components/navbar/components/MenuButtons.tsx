import { MenuIconButton } from "./MenuIconButton";
import history from "../../lib/history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";

interface MenuButtonsProps {
    setIsMenuOpen: (newValue: boolean) => void;
}

/**
 * Functional Component.
 *
 * Gets the `hasBackButton` property from the {@link NavbarContext}.
 * Uses this property to determine if a "back" button or a "menu" button should be shown.
 *
 * @param setIsMenuOpen - Function to open the drawer.
 * @constructor
 */
export const MenuButtons = ({ setIsMenuOpen }: MenuButtonsProps) => {
    const { hasBackButton } = useContext(NavbarContext);

    if (hasBackButton) {
        return (
            <MenuIconButton label={"back"} onClick={() => history.goBack()}>
                <ArrowBackIcon />
            </MenuIconButton>
        );
    }

    return (
        <MenuIconButton label="menu" onClick={() => setIsMenuOpen(true)}>
            <MenuIcon />
        </MenuIconButton>
    );
};
