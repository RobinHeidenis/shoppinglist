import { createContext } from "react";

export interface BottomNavContextSchema {
    setBottomNavValue: (newNavValue: number) => void;
    bottomNavValue: number;
}

export const BottomNavContext = createContext<BottomNavContextSchema>({
    bottomNavValue: 1,
    setBottomNavValue: () => undefined,
});
