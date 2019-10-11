import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import React from 'reactn';

import Login from './Login';
import Register from './Register';

const PortalSwitchNavigator = createAnimatedSwitchNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={250} />
        <Transition.In type="fade" durationMs={250} />
      </Transition.Together>
    ),
  },
);

export default PortalSwitchNavigator;
