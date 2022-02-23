import { MenuIconButton } from "./MenuIconButton";
import history from "../../lib/history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";

interface MenuButtonsProps {
    setIsMenuOpen: (newValue: boolean) => void;
}

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
