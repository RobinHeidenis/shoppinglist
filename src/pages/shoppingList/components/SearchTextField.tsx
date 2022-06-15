import React, { useContext } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
    const { setSearchValue, setDoSearch } = useContext(SearchContext);
    const { setIsEditing } = useContext(EditContext);

    return (
        <TextField
            variant="standard"
            value={value}
            hiddenLabel
            fullWidth
            autoFocus
            color="secondary"
            label={name}
            onChange={(e): void => {
                setValue(e.target.value);
            }}
            aria-valuemax={maxLength}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="search for this item on ah.nl"
                            onClick={(): void => {
                                if (fromEditing) setIsEditing(true);
                                setSearchValue(value);
                                setDoSearch(true);
                                setBottomNavValue(2);
                            }}
                            size="large"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{
                marginTop: "10px",
            }}
        />
    );
};
