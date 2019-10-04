import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';

import Icon from '@expo/vector-icons/Feather';
import CustomActions from './CustomActions';
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';

export default function ChatInput(props) {
  const [input, setInput] = useState('');
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [file, setFile] = useState(null);
  const [fileIsImage, setFileIsImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [extension, setExtension] = useState(null);

  const submit = () => {
    // send the message to parent
    props.onSend(input, file);
    setInput('');
    setShowFilePreview(false);
    setFile(null);
    setFileIsImage(false);
    setLoadingImage(false);
  };

  const updateFile = async file => {
    if (!file || !file.uri) {
      return false;
    }
    file.name =
      file.name ||
      file.uri.substring(file.uri.lastIndexOf('/') + 1, file.uri.length);
    const imgs = ['gif', 'png', 'jpg', 'jpeg', 'bmp'];
    let extension = file.uri.match(/\.(.{1,4})$/i);

    if (!extension) {
      setShowFilePreview(true);
      setFile(file);
      setFileIsImage(false);
      return;
    }
    if (imgs.indexOf(extension[1].toLowerCase()) !== -1) {
      setShowFilePreview(true);
      setFile(file);
      setFileIsImage(true);
      return;
    }
    setShowFilePreview(true);
    setFile(file);
    setFileIsImage(false);
  };

  const deleteImage = () => {
    setShowFilePreview(false);
    setFile(null);
    setFileIsImage(false);
  };

  const shouldRenderImage = () => {
    if (fileIsImage) {
      if (loadingImage) {
        return (
          <UIActivityIndicator
            color={'#FFFFFF'}
            size={20}
            style={{ flex: 0 }}
          />
        );
      }
      return <Image style={styles.previewImage} source={{ uri: file.uri }} />;
    } else {
      return <Icon name='file-text' color={'#FFFFFFb7'} size={20} />;
    }
  };

  return (
    <View>
      {/* message is sending */}
      {props.uploadInProgress && (
        <View style={styles.uploadingWrapper}>
          <UIActivityIndicator
            color={'#FFFFFF'}
            size={20}
            style={{ flex: 0, marginRight: 15 }}
          />
          <Text style={styles.sendingText}>Sending</Text>
        </View>
      )}
      {/* file preview */}
      {file && (
        <View style={styles.filePreviewWrapper}>
          {showFilePreview ? shouldRenderImage() : null}
          <Text style={styles.sendingText} ellipsizeMode={'middle'}>
            {file.name}
          </Text>

          <TouchableOpacity onPress={deleteImage}>
            <Icon name='x' color={'#FFFFFFb7'} size={20} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.composerContainer}>
        <CustomActions updateFile={updateFile} />
        <AutoGrowTextInput
          {...props}
          value={input}
          style={styles.composerInput}
          onChangeText={setInput}
          placeholder={'Enter Message'}
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
          placeholderTextColor={'#FFFFFFb7'}
        />
        {(input !== '' || file !== null) && (
          <TouchableOpacity onPress={submit} style={styles.sendContainer}>
            <Icon name='send' size={20} color={'#FFFFFF'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filePreviewWrapper: {
    backgroundColor: '#3a3e52',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  previewImage: {
    height: 50,
    width: 80,
    resizeMode: 'cover',
  },
  uploadingWrapper: {
    backgroundColor: '#3a3e52',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
  sendingText: {
    fontSize: 12,
    color: '#FFFFFFb7',
  },
  composerInput: {
    paddingTop: 10,
    color: '#FFFFFF',
    flex: 1,
  },
  composerContainer: {
    backgroundColor: '#3a3e52',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: "space-between"
  },
  sendContainer: {
    marginTop: 10,
    width: 40,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#3a3e52',
  },
});
