import { createSwitchNavigator, createAppContainer } from "react-navigation";

import PortalSwitchNavigator from "./portal";
import DashboardStackNavigator from "./app";
// import { fadingStackNavigator } from "../config/navigators";

/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */

const AppSwitchNavigator = createSwitchNavigator({
  Dashboard: { screen: DashboardStackNavigator },
  Portal: { screen: PortalSwitchNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
