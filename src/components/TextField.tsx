import React from "react";
import MUITextField from "@material-ui/core/TextField";

interface TextFieldProps {
    value: string;
    setValue: (newValue: string) => void;
    maxLength: number;
    name: string;
    autofocus?: boolean;
}

export function TextField({ value, setValue, maxLength, name, autofocus }: TextFieldProps) {
    return (
        <MUITextField
            margin="dense"
            id={name}
            label={name}
            type="text"
            inputProps={{ maxLength: maxLength }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            autoComplete="off"
            color={"secondary"}
            autoFocus={autofocus}
        />
    );
}
