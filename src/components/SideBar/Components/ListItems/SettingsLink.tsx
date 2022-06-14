import SettingsIcon from "@mui/icons-material/Settings";
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
export const SettingsLink = (): JSX.Element => <MenuLink listKey="Settings" location="/settings" icon={<SettingsIcon />} text="Settings" />;
