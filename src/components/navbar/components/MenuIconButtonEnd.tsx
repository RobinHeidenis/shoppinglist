import { IconButton } from "@material-ui/core";
import React from "react";
import { MenuIconButtonProps } from "../../../interfaces/MenuIconButtonProps";

export function MenuIconButtonEnd({ children, label, onClick }: MenuIconButtonProps) {
    return (
        <IconButton edge="end" color="inherit" aria-label={label} onClick={onClick}>
            {children}
        </IconButton>
    );
}
