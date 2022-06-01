import React, { FC, SVGProps } from "react";

export const Text: FC<SVGProps<SVGTextElement>> = ({ children, ...props }) => (
    <text {...props} style={{ font: "20px monospace" }}>
        {children}
    </text>
);
