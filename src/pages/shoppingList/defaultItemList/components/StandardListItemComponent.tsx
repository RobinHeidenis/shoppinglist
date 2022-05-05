import { StandardListItem } from "./standardListItem/StandardListItem";
import { Divider } from "@material-ui/core";
import React from "react";
import { StandardItem } from "../../../../interfaces/standardItem";

interface StandardListItemComponentProps {
    openFn: (id: number) => void;
    item: StandardItem;
}

export const StandardListItemComponent = ({ openFn, item }: StandardListItemComponentProps): JSX.Element => (
    <div>
        <StandardListItem openDeleteConfirmation={openFn} item={item} />
        <Divider />
    </div>
);
