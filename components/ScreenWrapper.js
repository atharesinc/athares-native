import React from 'reactn';

import { StyleSheet, View } from 'react-native';

const ScreenWrapper = ({
  dark = true,
  light = false,
  theme = false,
  styles = {},
  ...props
}) => (
  <View
    style={[
      baseStyles.base,
      theme ? baseStyles.theme : {},
      light ? baseStyles.light : {},
      styles,
    ]}
  >
    {props.children}
  </View>
);

export default ScreenWrapper;

const baseStyles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282a38',
  },
  theme: {
    backgroundColor: '#2f3242',
  },
  light: {
    backgroundColor: '#3a3e52',
  },
});
