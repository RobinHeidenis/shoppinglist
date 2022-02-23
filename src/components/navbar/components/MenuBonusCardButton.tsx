import { MenuIconButton } from "./MenuIconButton";
import history from "../../lib/history";
import { Redeem } from "@material-ui/icons";
import React from "react";

export const MenuBonusCardButton = () => (
    <MenuIconButton end label={"bonuscard button"} onClick={() => history.push("/bonuscard")}>
        <Redeem />
    </MenuIconButton>
);
