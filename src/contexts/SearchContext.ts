import { createContext } from "react";

export interface SearchContextSchema {
    setSearchValue: (title: string) => void;
    searchValue: string;
}

export const SearchContext = createContext<SearchContextSchema>({
    searchValue: "",
    setSearchValue: () => undefined,
});
