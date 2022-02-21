import React from "react";

export interface MenuIconButtonProps {
    children: any;
    label: string;
    onClick: (event: React.MouseEvent) => void;
    end?: boolean;
}
