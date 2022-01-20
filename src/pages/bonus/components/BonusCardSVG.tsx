import { FC, SVGProps } from "react";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        svg: {
            transform: "translate(0, 0)",
            padding: "5px",
            background: "#FFF",
        },
        fill: {
            fill: "#000000",
        },
    })
);

const Text: FC<SVGProps<SVGTextElement>> = ({ children, ...props }) => (
    <text {...props} style={{ font: "20px monospace" }}>
        {children}
    </text>
);

export function BonusCardSVG() {
    const classes = useStyles();

    return (
        <svg width="75%" x="0px" y="0px" viewBox="0 0 214 82" xmlns="http://www.w3.org/2000/svg" version="1.1" className={classes.svg}>
            <g transform="translate(0, 0)" className={classes.fill}>
                <Text textAnchor="start" x="0" y="82">
                    2
                </Text>
            </g>
            <g transform="translate(24, 0)" className={classes.fill}>
                <rect x="0" y="0" width="2" height="72" />
                <rect x="4" y="0" width="2" height="72" />
                <Text textAnchor="middle" x="3" y="94" />;
            </g>
            <g transform="translate(30, 0)" className={classes.fill}>
                <rect x="2" y="0" width="2" height="60" />
                <rect x="6" y="0" width="8" height="60" />
                <rect x="18" y="0" width="2" height="60" />
                <rect x="24" y="0" width="4" height="60" />
                <rect x="30" y="0" width="2" height="60" />
                <rect x="36" y="0" width="6" height="60" />
                <rect x="46" y="0" width="2" height="60" />
                <rect x="54" y="0" width="2" height="60" />
                <rect x="62" y="0" width="4" height="60" />
                <rect x="68" y="0" width="2" height="60" />
                <rect x="74" y="0" width="2" height="60" />
                <rect x="82" y="0" width="2" height="60" />
                <Text textAnchor="middle" x="42" y="82">
                    620707
                </Text>
            </g>
            <g transform="translate(114, 0)" className={classes.fill}>
                <rect x="2" y="0" width="2" height="72" />
                <rect x="6" y="0" width="2" height="72" />
                <Text textAnchor="middle" x="5" y="94" />
            </g>
            <g transform="translate(124, 0)" className={classes.fill}>
                <rect x="0" y="0" width="4" height="60" />
                <rect x="8" y="0" width="4" height="60" />
                <rect x="14" y="0" width="4" height="60" />
                <rect x="20" y="0" width="4" height="60" />
                <rect x="28" y="0" width="2" height="60" />
                <rect x="38" y="0" width="2" height="60" />
                <rect x="42" y="0" width="2" height="60" />
                <rect x="50" y="0" width="2" height="60" />
                <rect x="56" y="0" width="2" height="60" />
                <rect x="64" y="0" width="2" height="60" />
                <rect x="70" y="0" width="4" height="60" />
                <rect x="76" y="0" width="4" height="60" />
                <Text textAnchor="middle" x="42" y="82">
                    123772
                </Text>
            </g>
            <g transform="translate(208, 0)" className={classes.fill}>
                <rect x="0" y="0" width="2" height="72" />
                <rect x="4" y="0" width="2" height="72" />
                <Text textAnchor="middle" x="3" y="94" />
            </g>
        </svg>
    );
}
