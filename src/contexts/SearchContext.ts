import { createContext } from "react";

export interface SearchContextSchema {
    setSearchValue: (title: string) => void;
    searchValue: string;
    doSearch: boolean;
    setDoSearch: (doSearch: boolean) => void;
}

export const SearchContext = createContext<SearchContextSchema>({
    searchValue: "",
    setSearchValue: () => undefined,
    doSearch: false,
    setDoSearch: () => undefined,
});
