import React from 'react';
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
  transparentCard: true,
  headerMode: 'screen',
  mode: 'card',
  navigationOptions: {
    transitionSpec: {
      open: { opacity: 1 },
      close: {
        opacity: 0,
      },
    },
  },
  transitionConfig: () => ({
    // screenInterpolator: sceneProps => {
    //   const { layout, position, scene } = sceneProps;
    //   const { index } = scene;
    //   const width = layout.initWidth;

    //   return {
    //     opacity: position.interpolate({
    //       inputRange: [index - 1, index, index + 1],
    //       outputRange: [0, 1, 0],
    //     }),
    //     transform: [
    //       {
    //         translateX: position.interpolate({
    //           inputRange: [index - 1, index, index + 1],
    //           outputRange: [width, 0, -width],
    //         }),
    //       },
    //     ],
    //   };
    // },
    headerTitleInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;
      const width = layout.initWidth;
      return {
        opacity: position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 1, 0],
        }),
        transform: [
          {
            translateX: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [width, 0, -width],
            }),
          },
        ],
      };
    },
  }),
};

export { fadingStackNavigator, slidingStackNavigator };
