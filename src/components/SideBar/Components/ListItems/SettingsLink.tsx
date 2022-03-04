import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { MenuLink } from "../../../ui/MenuLink";

/**
 * Functional Component. <br/>
 *
 * Renders the "Settings" link in the sidebar.
 * Redirects the user to the settings page on click and closes the sidebar.
 *
 * @constructor
 */
export const SettingsLink = () => <MenuLink listKey={"Settings"} location={"/settings"} icon={<SettingsIcon />} text={"Settings"} />;
