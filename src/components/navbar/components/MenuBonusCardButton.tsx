import { Redeem } from "@material-ui/icons";
import React from "react";
import { MenuIconButton } from "./MenuIconButton";
import history from "../../lib/history";

/**
 * Functional Component. <br/>
 *
 * Renders a "card" button that redirects the user to the "bonus card" page.
 *
 * @constructor
 */
export const MenuBonusCardButton = (): JSX.Element => (
    <MenuIconButton
        end
        label="bonuscard button"
        onClick={(): void => {
            history.push("/bonuscard");
        }}
    >
        <Redeem />
    </MenuIconButton>
);
