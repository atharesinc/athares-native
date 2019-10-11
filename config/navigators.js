import React from 'reactn';
import Header from '../components/Header';

const fadingStackNavigator = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  transitionConfig: () => ({
    containerStyle: {
      backgroundColor: 'transparent',
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;
      const width = layout.initWidth;

      return {
        opacity: position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 1, 0],
        }),
      };
    },
  }),
};

const slidingStackNavigator = {
  defaultNavigationOptions: {
    gesturesEnabled: true,
    gesturesDirection: 'inverted',
    animationEnabled: true,
    header: props => <Header {...props} />,
    cardTransparent: true,
    backgroundColor: 'transparent',
  },
  headerMode: 'screen',
};

export { fadingStackNavigator, slidingStackNavigator };
