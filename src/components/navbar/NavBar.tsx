import { AppBar, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext, useState } from "react";
import SwipeableTemporaryDrawer from "./SideBar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { MoreVert, Redeem } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useRequest from "../../hooks/useRequest";
import history from "../lib/history";
import { NavbarContext } from "../../contexts/NavbarContext";
import { MenuIconButtonStart } from "./components/MenuIconButtonStart";
import { MenuIconButtonEnd } from "./components/MenuIconButtonEnd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeAllItems } from "../../slices/items/items.slice";

interface NavBarProps {
    isOnItemList: boolean;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    })
);

export default function NavBar({ isOnItemList }: NavBarProps) {
    const classes = useStyles();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [request] = useRequest();
    const items = useAppSelector((state) => state.items.items);
    const dispatch = useAppDispatch();
    const { title, hasBackButton } = useContext(NavbarContext);

    const handleMenuItemClick = () => {
        setAnchorEl(null);
        if (items.length === 0) return;
        request({ path: "deleteAllItems" }).then(() => dispatch(removeAllItems()));
    };

    return (
        <>
            <AppBar position={"sticky"}>
                <Toolbar>
                    {hasBackButton ? (
                        <MenuIconButtonStart label={"back"} onClick={() => history.goBack()}>
                            <ArrowBackIcon />
                        </MenuIconButtonStart>
                    ) : (
                        <MenuIconButtonStart label="menu" onClick={() => setIsMenuOpen(true)}>
                            <MenuIcon />
                        </MenuIconButtonStart>
                    )}
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>

                    {!hasBackButton && (
                        <MenuIconButtonEnd label={"bonuscard button"} onClick={() => history.push("/bonuscard")}>
                            <Redeem />
                        </MenuIconButtonEnd>
                    )}

                    {isOnItemList && (
                        <div>
                            <MenuIconButtonEnd label={"menu button"} onClick={(e) => setAnchorEl(e.currentTarget as HTMLElement)}>
                                <MoreVert />
                            </MenuIconButtonEnd>
                            <Menu id="itemMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                                <MenuItem onClick={handleMenuItemClick}>Remove all items</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {!hasBackButton && <SwipeableTemporaryDrawer updateMenuState={setIsMenuOpen} menuOpen={isMenuOpen} />}
        </>
    );
}
