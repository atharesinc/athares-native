import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import React from 'reactn';

import PortalSwitchNavigator from './portal';
import DashboardStackNavigator from './app';
import SplashScreen from './splash';

const AppSwitchNavigator = createAnimatedSwitchNavigator(
  {
    Splash: { screen: SplashScreen },
    Portal: { screen: PortalSwitchNavigator },
    Dashboard: { screen: DashboardStackNavigator },
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
