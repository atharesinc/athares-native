import React from 'reactn';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import ImageMessage from './ImageMessage';
import FileMessage from './FileMessage';
import AsyncImageAnimated from 'react-native-async-image-animated';
import FadeInView from './FadeInView';

const Message = ({ message: msg, isMine, multiMsg, ...props }) => {
  const timestamp =
    props.timestamp.substring(0, 10) === moment().format('YYYY-MM-DD')
      ? 'Today ' + moment(props.timestamp).format('h:mma')
      : moment(props.timestamp).format('dddd h:mma');

  const isImage = (file, fileName) => {
    const imgs = ['gif', 'png', 'jpg', 'jpeg', 'bmp'];

    let extension = fileName.match(/\.(.{1,4})$/i)
      ? fileName.match(/\.(.{1,4})$/i)[1]
      : '';

    if (imgs.findIndex(i => i === extension.toLowerCase()) !== -1) {
      return <ImageMessage file={file} fileName={fileName} />;
    } else {
      return <FileMessage file={file} fileName={fileName} />;
    }
  };

  return (
    <FadeInView style={styles.messageWrapper}>
      {multiMsg === false && (
        <Text style={styles.messageUserText}>
          {msg.user.firstName + ' ' + msg.user.lastName}
        </Text>
      )}
      <View style={styles.messageAvatarAndContentWrapper}>
        {multiMsg === false ? (
          <View style={styles.avatarWrapper}>
            <AsyncImageAnimated
              source={{ uri: msg.user.icon }}
              style={styles.messageAvatar}
              placeholderColor={'#3a3e52'}
            />
          </View>
        ) : null}
        <View style={styles.messageContentWrapper}>
          {msg.text ? (
            <Text
              style={[
                styles.messageText,
                isMine ? styles.me : styles.otherUser,
              ]}
            >
              {msg.text}
            </Text>
          ) : null}
        </View>
      </View>
      {msg.file && isImage(msg.file, msg.fileName)}

      <Text style={styles.timestamp}>{timestamp}</Text>
    </FadeInView>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageAvatarAndContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  messageContentWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  me: {
    backgroundColor: '#00DFFC30',
    borderColor: '#00dffc',
    borderWidth: 1,
  },
  otherUser: {
    backgroundColor: '#ffffff30',
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  messageWrapper: {
    margin: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  messageUserText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 10,
  },
  avatarWrapper: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  messageAvatar: {
    height: 40,
    width: 40,
  },
  messageText: {
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // borderRadius: 20
  },
  timestamp: {
    color: '#FFFFFFb7',
    fontSize: 10,
  },
});
