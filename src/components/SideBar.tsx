import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from '@material-ui/icons/Settings';
import history from "./lib/history";

interface SideBarProps {
    updateMenuState: (newValue: boolean) => void;
    menuOpen: boolean;
}

export default function SwipeableTemporaryDrawer({menuOpen, updateMenuState}: SideBarProps): JSX.Element {
    return (
        <div>
            <SwipeableDrawer
                open={menuOpen}
                onClose={() => updateMenuState(false)}
                onOpen={() => updateMenuState(true)}
            >
                <div>
                    <List>
                        <ListItem button key="List" onClick={() => {
                            history.push("/")
                            updateMenuState(false)
                        }}>
                            <ListItemIcon><ListIcon/></ListItemIcon>
                            <ListItemText primary="Shopping list"/>
                        </ListItem>
                        <ListItem button key="Settings" onClick={() => {
                            history.push("/settings")
                            updateMenuState(false);
                        }}>
                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                            <ListItemText primary="Settings"/>
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        </div>
    );
}
