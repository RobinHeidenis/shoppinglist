import { MenuIconButton } from "./MenuIconButton";
import history from "../../lib/history";
import { Redeem } from "@material-ui/icons";
import React from "react";

/**
 * Functional Component. <br/>
 *
 * Renders a "card" button that redirects the user to the "bonus card" page.
 *
 * @constructor
 */
export const MenuBonusCardButton = () => (
    <MenuIconButton end label={"bonuscard button"} onClick={() => history.push("/bonuscard")}>
        <Redeem />
    </MenuIconButton>
);
