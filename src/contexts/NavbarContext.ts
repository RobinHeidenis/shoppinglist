import { createContext } from "react";

export interface NavbarContextSchema {
    setTitle: (title: string) => void;
    title: string;
    setHasBackButton: (backButton: boolean) => void;
    hasBackButton: boolean;
}

export const NavbarContext = createContext<NavbarContextSchema>({
    title: "",
    setTitle: () => undefined,
    hasBackButton: false,
    setHasBackButton: () => false,
});
