import { MenuIconButton } from "./MenuIconButton";
import history from "../../lib/history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { SideBarContext } from "../../../contexts/SideBarContext";

/**
 * Functional Component.<br/>
 *
 * Gets the `hasBackButton` property from the {@link NavbarContext}.<br/>
 * Gets the `setIsDrawerOpen` function from the {@link SideBarContext}.<br/>
 * Uses this property to determine if a "back" button or a "menu" button should be shown.
 *
 * @constructor
 */
export const MenuButtons = () => {
    const { hasBackButton } = useContext(NavbarContext);
    const { setIsDrawerOpen } = useContext(SideBarContext);

    if (hasBackButton) {
        return (
            <MenuIconButton label={"back"} onClick={() => history.goBack()}>
                <ArrowBackIcon />
            </MenuIconButton>
        );
    }

    return (
        <MenuIconButton label="menu" onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
        </MenuIconButton>
    );
};
