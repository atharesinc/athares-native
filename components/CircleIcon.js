import React from 'reactn';

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncImageAnimated from 'react-native-async-image-animated';

const CircleIcon = ({ selected = false, circle = {}, ...props }) => {
  const selectCircle = () => {
    props.selectCircle(circle.id);
  };
  return (
    <TouchableOpacity style={styles.circleWrapper} onPress={selectCircle}>
      <View
        style={{ ...styles.circleIconWrapper, borderWidth: selected ? 4 : 0 }}
      >
        <AsyncImageAnimated
          source={{ uri: circle.icon }}
          style={styles.circle}
          placeholderColor={'#3a3e52'}
        />
      </View>
      <Text
        numberOfLines={1}
        style={styles.circleLabel}
        ellipsizeMode={'middle'}
      >
        {circle.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CircleIcon;

const styles = StyleSheet.create({
  circleWrapper: {
    width: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
  },
  circleIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginBottom: 5,
    borderColor: '#00dffc',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  circleLabel: {
    fontSize: 13,
    color: '#ffffffb7',
  },
});
