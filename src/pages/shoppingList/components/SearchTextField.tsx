import React, { useContext } from "react";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { BottomNavContext } from "../../../contexts/BottomNavContext";
import { SearchContext } from "../../../contexts/SearchContext";
import { EditContext } from "../../../contexts/EditContext";

interface TextFieldProps {
    value: string;
    setValue: (newValue: string) => void;
    maxLength: number;
    name: string;
    fromEditing?: boolean;
}

export const SearchTextField = ({ value, setValue, maxLength, name, fromEditing }: TextFieldProps): JSX.Element => {
    const { setBottomNavValue } = useContext(BottomNavContext);
    const { setSearchValue } = useContext(SearchContext);
    const { setIsEditing } = useContext(EditContext);

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor={`SearchTextField${name}`} color="secondary">
                {name}
            </InputLabel>
            <Input
                id={`SearchTextField${name}`}
                value={value}
                onChange={(e): void => {
                    setValue(e.target.value);
                }}
                inputProps={{ maxLength }}
                type="text"
                color="secondary"
                autoComplete="off"
                fullWidth
                autoFocus
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="search for this item on ah.nl"
                            onClick={(): void => {
                                if (fromEditing) setIsEditing(true);
                                setSearchValue(value);
                                setBottomNavValue(2);
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};
