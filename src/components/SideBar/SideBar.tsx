import React, { useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { SwipeableDrawerContent } from "./Components/SwipeableDrawerContent";
import { SideBarContext } from "../../contexts/SideBarContext";

/**
 * Functional Component.<br/>
 *
 * Renders a drawer on the left of the screen.
 * This drawer is closed by default.
 * Opens when the `isDrawerOpen` property is set to true.<br/>
 *
 * Gets the `isDrawerOpen` property and `setIsDrawerOpen` function from the {@link SideBarContext}
 *
 * @constructor
 */
export const SideBar = (): JSX.Element => {
    const { isDrawerOpen, setIsDrawerOpen } = useContext(SideBarContext);

    return (
        <SwipeableDrawer
            open={isDrawerOpen}
            onClose={(): void => {
                setIsDrawerOpen(false);
            }}
            onOpen={(): void => {
                setIsDrawerOpen(true);
            }}
        >
            <SwipeableDrawerContent />
        </SwipeableDrawer>
    );
};
