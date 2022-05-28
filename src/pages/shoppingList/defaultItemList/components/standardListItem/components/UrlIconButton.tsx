import LinkIcon from "@material-ui/icons/Link";
import { IconButton } from "@material-ui/core";
import React from "react";

interface UrlIconButtonProps {
    url: string;
}

/**
 * Functional Component
 *
 * Returns an {@link IconButton} with a {@link LinkIcon} as button icon.
 *
 * On click opens the given url.
 * @param url
 * @constructor
 */
export const UrlIconButton = ({ url }: UrlIconButtonProps): JSX.Element => (
    <IconButton
        aria-label="link to product on ah.nl"
        onClick={(e): void => {
            e.stopPropagation();
            window.open(url);
        }}
    >
        <LinkIcon />
    </IconButton>
);
