import React, { useState } from 'reactn';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { pickImageURIAsync } from '../utils/mediaUtils';
import defaultCircleImage from './defaultCircleImage';

export default function AvatarPicker({
  rounded = false,
  uri = null,
  ...props
}) {
  const [imageURI, setImageURI] = useState(defaultCircleImage);

  const changeImage = async () => {
    let res = await pickImageURIAsync();
    setImageURI(res);
    if (props.onImageChange) {
      props.onImageChange(res);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.previewWrapper, rounded ? styles.rounded : {}]}
      onPress={changeImage}
    >
      <Image
        source={{ uri: uri ? uri : imageURI }}
        style={[styles.preview, rounded ? styles.noBorder : {}]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  preview: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
    padding: 0,
    margin: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  rounded: {
    borderRadius: 9999,
    borderColor: '#FFFFFF',
    borderWidth: 5,
  },
  noBorder: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  previewWrapper: {
    backgroundColor: 'transparent',
    height: 150,
    width: 150,
    padding: 0,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
