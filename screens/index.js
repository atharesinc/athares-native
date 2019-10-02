import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import React from 'react';

import PortalSwitchNavigator from './portal';
import DashboardStackNavigator from './app';
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

// const AppSwitchNavigator = createSwitchNavigator({
//   Portal: { screen: PortalSwitchNavigator },
//   Dashboard: { screen: DashboardStackNavigator },
// });

const AppSwitchNavigator = createAnimatedSwitchNavigator(
  {
    Portal: { screen: PortalSwitchNavigator },
    Dashboard: { screen: DashboardStackNavigator },
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type='slide-bottom'
          durationMs={400}
          interpolation='easeIn'
        />
        <Transition.In type='fade' durationMs={500} />
      </Transition.Together>
    ),
  },
);

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
