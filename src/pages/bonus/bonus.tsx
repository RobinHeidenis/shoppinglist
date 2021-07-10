import { useContext, useEffect } from "react";
import { Box } from "@material-ui/core";
import { NavbarContext } from "../../contexts/NavbarContext";
import { BonusCardSVG } from "../../components/svg/BonusCardSVG";

interface BonusCardProps {
    setHasBackButton: (newValue: boolean) => void;
}

export default function BonusCard({ setHasBackButton }: BonusCardProps) {
    const { setTitle } = useContext(NavbarContext);

    useEffect(() => {
        setTitle("Bonuscard");
        setHasBackButton(true);
        return () => {
            setHasBackButton(false);
        };
    }, []);

    return (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} marginTop={"10px"}>
            <BonusCardSVG />
        </Box>
    );
}
