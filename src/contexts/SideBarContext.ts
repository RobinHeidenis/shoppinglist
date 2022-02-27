import { createContext } from "react";

export interface SideBarContextSchema {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (drawerOpen: boolean) => void;
}

/**
 * Context.
 *
 * Context for the sidebar, dictating whether it is open or not.
 * Also provides a function to update the open property.
 */
export const SideBarContext = createContext<SideBarContextSchema>({
    isDrawerOpen: false,
    setIsDrawerOpen: () => false,
});
