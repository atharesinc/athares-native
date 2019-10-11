import React, { useRef } from 'reactn';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';

function InfoLine({
  value = '',
  icon,
  label,
  iconStyles = {},
  style = {},
  ...props
}) {
  const inputEl = useRef(null);
  const handleClick = () => {
    inputEl.current.focus();
  };

  return (
    <TouchableOpacity
      style={{ ...styles.touchWrap, ...style }}
      onPress={handleClick}
    >
      <View style={[styles.wrapper]}>
        <View style={styles.linePre}>
          <Icon name={icon} size={25} color={'#FFFFFF'} styles={styles.icon} />
          <Text style={styles.label}>{label}</Text>
        </View>
        <TextInput
          {...props}
          value={value}
          style={styles.input}
          placeholder='Not set'
          ref={inputEl}
          numberOfLines={1}
        />
      </View>
    </TouchableOpacity>
  );
}

export default InfoLine;

const styles = StyleSheet.create({
  touchWrap: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  wrapper: {
    marginVertical: 5,
    marginHorizontal: 15,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingRight: 30,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 15,
  },
  linePre: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    width: '50%',
    textAlign: 'right',
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
  },
});
