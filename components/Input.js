import React, { useRef } from 'reactn';
import { TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';

function Input({ style = {}, label = null, description = null, ...props }) {
  const inputEl = useRef(null);

  const handleClick = () => {
    inputEl.current.focus();
  };

  return (
    <TouchableOpacity
      style={{ ...styles.wrapper, ...style }}
      onPress={handleClick}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        style={styles.input}
        ref={inputEl}
        numberOfLines={props.multiline ? 2 : 1}
        placeholderColor={'#FFFFFFb7'}
      />
      {description && <Text style={styles.description}>{description}</Text>}
    </TouchableOpacity>
  );
}

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
    overflow: 'hidden',
  },
  input: {
    color: '#FFF',
    fontSize: 18,
    width: '100%',
    backgroundColor: '#3a3e52',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFF',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFFb7',
  },
});
