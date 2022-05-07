import { Divider } from "@material-ui/core";
import React from "react";
import { StandardListItem } from "./standardListItem/StandardListItem";
import { StandardItem } from "../../../../interfaces/standardItem";

interface StandardListItemComponentProps {
    openFn: (id: number) => void;
    item: StandardItem;
}

/**
 * Functional Component
 *
 * Shows a {@link StandardListItem} and a {@link Divider} element.
 * Passes the openFn and item props to the {@link StandardListItem} component.
 *
 * @param openFn
 * @param item
 * @constructor
 */
export const StandardListItemComponent = ({ openFn, item }: StandardListItemComponentProps): JSX.Element => (
    <div>
        <StandardListItem openDeleteConfirmation={openFn} item={item} />
        <Divider />
    </div>
);
