import React from "react";
import MUITextField from "@material-ui/core/TextField";

interface TextFieldProps {
    value: string;
    setValue: (newValue: string) => void;
    maxLength: number;
    name: string;
    autofocus?: boolean;
}

export const TextField = ({ value, setValue, maxLength, name, autofocus }: TextFieldProps): JSX.Element => (
        <MUITextField
            margin="dense"
            id={name}
            label={name}
            type="text"
            inputProps={{ maxLength }}
            value={value}
            onChange={(e): void => { setValue(e.target.value); }}
            fullWidth
            autoComplete="off"
            color="secondary"
            autoFocus={autofocus}
        />
    );
