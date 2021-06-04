import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, {useContext, useState} from "react";
import SwipeableTemporaryDrawer from "./SideBar";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {MoreVert, Redeem} from "@material-ui/icons";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import request from "./lib/request";
import {ShoppingListContext} from "../contexts/ShoppingListContext";
import history from "./lib/history";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

interface props {
    title: string
    isOnItemList: boolean
    hasBackButton: boolean
}

export default function NavBar(props: props) {
    const classes = useStyles();
    const { items, setItems } = useContext(ShoppingListContext);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = () => {
        setAnchorEl(null);
        if (items.length <= 0) return;
        request('deleteAllItems').then(() => setItems([]));
    };

    return (
        <>
            <AppBar position={"sticky"}>
                <Toolbar>
                    {props.hasBackButton ?
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="back"
                                    onClick={() => {
                                        history.goBack();
                                    }}>
                            <ArrowBackIcon/>
                        </IconButton> :
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={() => {
                                        setIsMenuOpen(true)
                                    }}>
                            <MenuIcon/>
                        </IconButton>
                    }
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>

                    {props.hasBackButton ? null :
                        <IconButton edge={"end"} color={"inherit"} aria-label={"bonuscard button"} onClick={() => {
                            history.push('/bonuscard')
                        }}>
                            <Redeem/>
                        </IconButton>}

                    {props.isOnItemList ?
                        <>
                            <IconButton edge={"end"} color={"inherit"} aria-label={"menu button"} onClick={handleClick}>
                                <MoreVert/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleMenuItemClick}>Remove all items</MenuItem>
                            </Menu> </> : null}
                </Toolbar>
            </AppBar>
            {props.hasBackButton ? null :
                <SwipeableTemporaryDrawer updateMenuState={setIsMenuOpen} menuOpen={isMenuOpen}/>}
        </>
    );
};
