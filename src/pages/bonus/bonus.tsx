import {CSSProperties, useEffect} from "react";
import {Box} from "@material-ui/core";

interface props {
    setTitle: (newValue: string) => void
    setHasBackButton: (newValue: boolean) => void;
}

export default function BonusCard(props: props) {
    const fill: CSSProperties = {
        fill: "#000000"
    }
    const monospace: CSSProperties = {
        font: "20px monospace"
    }

    useEffect(() => {
        props.setTitle("Bonuscard");
        props.setHasBackButton(true);
        return () => {
            props.setHasBackButton(false)
        }
    });

    return (
        <div>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} marginTop={"10px"}>
                <svg width="75%" x="0px" y="0px" viewBox="0 0 214 82"
                     xmlns="http://www.w3.org/2000/svg" version="1.1"
                     style={{transform: "translate(0, 0)", padding: "5px", background: "#FFF"}}>
                    <g transform="translate(0, 0)" style={fill}>
                        <text style={monospace} textAnchor="start" x="0" y="82">2</text>
                    </g>
                    <g transform="translate(24, 0)" style={fill}>
                        <rect x="0" y="0" width="2" height="72"/>
                        <rect x="4" y="0" width="2" height="72"/>
                        <text style={monospace} textAnchor="middle" x="3" y="94"/>
                    </g>
                    <g transform="translate(30, 0)" style={fill}>
                        <rect x="2" y="0" width="2" height="60"/>
                        <rect x="6" y="0" width="8" height="60"/>
                        <rect x="18" y="0" width="2" height="60"/>
                        <rect x="24" y="0" width="4" height="60"/>
                        <rect x="30" y="0" width="2" height="60"/>
                        <rect x="36" y="0" width="6" height="60"/>
                        <rect x="46" y="0" width="2" height="60"/>
                        <rect x="54" y="0" width="2" height="60"/>
                        <rect x="62" y="0" width="4" height="60"/>
                        <rect x="68" y="0" width="2" height="60"/>
                        <rect x="74" y="0" width="2" height="60"/>
                        <rect x="82" y="0" width="2" height="60"/>
                        <text style={monospace} textAnchor="middle" x="42" y="82">620707</text>
                    </g>
                    <g transform="translate(114, 0)" style={fill}>
                        <rect x="2" y="0" width="2" height="72"/>
                        <rect x="6" y="0" width="2" height="72"/>
                        <text style={monospace} textAnchor="middle" x="5" y="94"/>
                    </g>
                    <g transform="translate(124, 0)" style={fill}>
                        <rect x="0" y="0" width="4" height="60"/>
                        <rect x="8" y="0" width="4" height="60"/>
                        <rect x="14" y="0" width="4" height="60"/>
                        <rect x="20" y="0" width="4" height="60"/>
                        <rect x="28" y="0" width="2" height="60"/>
                        <rect x="38" y="0" width="2" height="60"/>
                        <rect x="42" y="0" width="2" height="60"/>
                        <rect x="50" y="0" width="2" height="60"/>
                        <rect x="56" y="0" width="2" height="60"/>
                        <rect x="64" y="0" width="2" height="60"/>
                        <rect x="70" y="0" width="4" height="60"/>
                        <rect x="76" y="0" width="4" height="60"/>
                        <text style={monospace} textAnchor="middle" x="42" y="82">123772</text>
                    </g>
                    <g transform="translate(208, 0)" style={fill}>
                        <rect x="0" y="0" width="2" height="72"/>
                        <rect x="4" y="0" width="2" height="72"/>
                        <text style={monospace} textAnchor="middle" x="3" y="94"/>
                    </g>
                </svg>
            </Box>
        </div>);
}