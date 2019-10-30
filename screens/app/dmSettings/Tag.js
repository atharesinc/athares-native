import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Feather';

export const Tag = ({ handleDelete, i, tag, ...props }) => {
  const handlePress = () => {
    console.log('delete me', i);
    handleDelete(i);
  };

  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{tag.name}</Text>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={handlePress}
      >
        <Icon name="x" size={20} color={styles.tagText.color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderColor: '#00DFFC',
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagText: {
    color: '#00DFFC',
    fontSize: 15,
  },
});
