import React, { useContext, useEffect } from "react";
import { Box } from "@material-ui/core";
import { NavbarContext } from "../../contexts/NavbarContext";
import { BonusCardSVG } from "./components/BonusCardSVG";

export const BonusCard = (): JSX.Element => {
    const { setTitle, setHasBackButton } = useContext(NavbarContext);

    useEffect(() => {
        setTitle("Bonuscard");
        setHasBackButton(true);
        return () => {
            setHasBackButton(false);
        };
    }, [setTitle, setHasBackButton]);

    return (
        <Box display="flex" flexDirection="row" justifyContent="center" marginTop="10px">
            <BonusCardSVG />
        </Box>
    );
};
