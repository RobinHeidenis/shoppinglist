import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext } from "react";
import history from "../../lib/history";
import { MenuIconButton } from "./MenuIconButton";
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
export const MenuButtons = (): JSX.Element => {
    const { hasBackButton } = useContext(NavbarContext);
    const { setIsDrawerOpen } = useContext(SideBarContext);

    if (hasBackButton) {
        return (
            <MenuIconButton
                label="back"
                onClick={(): void => {
                    history.goBack();
                }}
            >
                <ArrowBackIcon />
            </MenuIconButton>
        );
    }

    return (
        <MenuIconButton
            label="menu"
            onClick={(): void => {
                setIsDrawerOpen(true);
            }}
        >
            <MenuIcon />
        </MenuIconButton>
    );
};
