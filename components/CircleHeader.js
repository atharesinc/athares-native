import React from 'reactn';

import { Text, View, StyleSheet } from 'react-native';

const CircleHeader = ({ name = 'No Circle Selected' }) => {
  return (
    <View style={styles.header}>
      <View style={styles.textWrapper}>
        <Text style={styles.headerText} numberOfLines={1}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#282a38',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  textWrapper: {
    backgroundColor: '#3a3e52',
    borderRadius: 9999,
  },
  headerText: {
    color: '#FFF',
    fontSize: 15,
    letterSpacing: 2,
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default CircleHeader;
