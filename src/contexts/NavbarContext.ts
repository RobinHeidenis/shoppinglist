import { createContext } from "react";

export interface NavbarContextSchema {
    setTitle: (title: string) => void;
    title: string;
}

export const NavbarContext = createContext<NavbarContextSchema>({
    title: "",
    setTitle: () => undefined,
});
