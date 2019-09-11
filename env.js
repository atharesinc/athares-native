/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { ENV } from './vars.js';

// const localhost = Platform.OS === 'ios' ? 'localhost:8080' : '10.0.2.2:8080';

// use this to add constants that don't contain sensitive information
const SECURE_CONSTANTS = {
  DEFAULT_IMG:
    'https://athares-images.s3.us-east-2.amazonaws.com/user-default.png',
};
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return { ...SECURE_CONSTANTS, ...ENV.dev };
  } else if (env === 'staging') {
    return { ...SECURE_CONSTANTS, ...ENV.staging };
  } else if (env === 'prod') {
    return { ...ENV.prod, ...SECURE_CONSTANTS };
  }
};

export default getEnvVars;
