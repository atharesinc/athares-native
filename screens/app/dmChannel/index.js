import React, { Component, withGlobal } from 'reactn';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Constants from 'expo-constants';

import {
  StyleSheet,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Text,
} from 'react-native';
import Menu from '../dmSettings';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Chat from '../../../components/Chat';
import ChatInput from '../../../components/ChatInput';
import { decrypt } from '../../../utils/crypto';
import SimpleCrypto from 'simple-crypto-js';
import { CREATE_MESSAGE } from '../../../graphql/mutations';
import {
  GET_MESSAGES_FROM_CHANNEL_ID,
  GET_USER_KEYS,
} from '../../../graphql/queries';
import { SUB_TO_MESSAGES_BY_CHANNEL_ID } from '../../../graphql/subscriptions';
import { compose, graphql, Query } from 'react-apollo';
import { uploadImage, uploadDocument } from '../../../utils/upload';
import { UIActivityIndicator } from 'react-native-indicators';
import { isIphone10 } from '../../../utils/device';

class DMChannelWithoutDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoEnabled: false,
      text: '',
      uploadInProgress: false,
    };
    this.simpleCrypto = new SimpleCrypto('nope');
  }

  async componentDidMount() {
    if (this.props.activeChannel) {
      this.removeUnreadDM(this.props.activeChannel);
    }
    if (this.props.getUserKeys.User) {
      try {
        let hashed = await AsyncStorage.getItem('ATHARES_HASH');
        let simpleCryptoForUserPriv = new SimpleCrypto(hashed);
        const userPriv = simpleCryptoForUserPriv.decrypt(
          this.props.getUserKeys.User.priv,
        );

        let decryptedChannelSecret = await decrypt(
          this.props.getUserKeys.User.keys[0].key,
          userPriv,
        );

        this.simpleCrypto.setSecret(decryptedChannelSecret);
        this.setState({
          cryptoEnabled: true,
        });
      } catch (err) {
        console.error(new Error(err));
      }
    }
  }
  removeUnreadDM(chan) {
    let { unreadDMs } = this.global;
    if (unreadDMs.includes(chan)) {
      let index = unreadDMs.findIndex(d => d === chan);
      if (index !== -1) {
        unreadDMs.splice(index, 1);
        unreadDMs = [...unreadDMs];
        this.setGlobal({
          unreadDMs,
        });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.dmSettings !== this.props.dmSettings) {
      this.props.navigation.toggleDrawer();
    }
    // if (
    //   this.props.activeChannel &&
    //   this.props.activeChannel !== prevProps.activeChannel
    // ) {
    //   this.props.dispatch(removeUnreadDM(this.props.activeChannel));
    // }
    if (prevProps.getUserKeys.User !== this.props.getUserKeys.User) {
      try {
        let hashed = await AsyncStorage.getItem('ATHARES_HASH');
        let simpleCryptoForUserPriv = new SimpleCrypto(hashed);

        let userPriv = simpleCryptoForUserPriv.decrypt(
          this.props.getUserKeys.User.priv,
        );

        let decryptedChannelSecret = decrypt(
          this.props.getUserKeys.User.keys[0].key,
          userPriv,
        );

        this.simpleCrypto.setSecret(decryptedChannelSecret);
        this.setState({
          cryptoEnabled: true,
        });
      } catch (err) {
        console.error(new Error(err));
      }
    }
  }
  submit = async (text = '', file = null) => {
    if (text.trim() === '' && file === null) {
      return false;
    }
    let { user, activeChannel: channel } = this.global;

    let response = null;
    try {
      if (file) {
        await this.setState({
          uploadInProgress: true,
        });
        const imgs = ['gif', 'png', 'jpg', 'jpeg', 'bmp'];
        let extension = file.name.match(/\.(.{1,4})$/i);
        if (imgs.indexOf(extension[1].toLowerCase()) !== -1) {
          response = await uploadImage(file);
        } else {
          response = await uploadDocument(file);
        }
      }
      if (response) {
        if (response.error) {
          console.error(new Error(response.error));
          return false;
        }
      }
      if (text.trim() === '' && !response.url) {
        return false;
      }
      // encrypt the relevant parts of the message
      let newMessage = {
        text: this.simpleCrypto.encrypt(text.trim()),
        channel,
        user: this.global.user,
        file: response ? this.simpleCrypto.encrypt(response.url) : null,
        fileName: response ? response.name : null,
      };

      await this.props.createMessage({
        variables: {
          ...newMessage,
        },
      });
      this.setState({
        uploadInProgress: false,
      });
    } catch (err) {
      this.setState({
        uploadInProgress: false,
      });
      console.error(new Error(err));
      Alert.alert(
        'Error',
        'We were unable to send your message, please try again later',
      );
    }
  };
  normalizeName = name => {
    let retval = name
      .split(', ')
      .filter(
        n =>
          n !==
          this.props.getUserKeys.User.firstName +
            ' ' +
            this.props.getUserKeys.User.lastName,
      );
    if (retval.length === 0) {
      return name;
    }
    if (retval.length < 3) {
      return retval.join(' & ');
    }
    if (retval.length < 6) {
      retval = [
        ...retval.splice(0, retval.length - 1),
        ['and', retval[retval.length - 1]].join(' '),
      ];
      retval = retval.join(', ');
      return retval;
    }
    retval = [...retval.splice(0, 4), '...and ' + retval.length + ' more'];
    retval = retval.join(', ');
    return retval;
  };
  _subToMore = subscribeToMore => {
    subscribeToMore({
      document: SUB_TO_MESSAGES_BY_CHANNEL_ID,
      variables: { id: this.global.activeChannel || '' },
      updateQuery: (prev, { subscriptionData }) => {
        let newMsg = subscriptionData.data.Message.node;
        if (!prev.Channel.messages.find(m => m.id === newMsg.id)) {
          // merge new messages into prev.messages
          prev.Channel.messages = [...prev.Channel.messages, newMsg];
        }

        return prev;
      },
    });
  };
  render() {
    let { getUserKeys } = this.props;
    let channel = null,
      messages = [],
      user = null;
    return (
      <Query
        query={GET_MESSAGES_FROM_CHANNEL_ID}
        variables={{ id: this.global.activeChannel || '' }}
        onCompleted={this.scrollToBottom}
      >
        {({ data, subscribeToMore }) => {
          if (data.Channel) {
            this._subToMore(subscribeToMore);
            channel = data.Channel;
            messages = data.Channel.messages;
          }
          if (getUserKeys.User) {
            user = getUserKeys.User;
          }

          if (channel && messages && user && this.state.cryptoEnabled) {
            messages = messages.map(m => ({
              ...m,
              text: this.simpleCrypto.decrypt(m.text),
              file: m.file ? this.simpleCrypto.decrypt(m.file) : null,
            }));

            return (
              <ScreenWrapper styles={[styles.wrapper]}>
                <Chat user={user} messages={messages} />
                <KeyboardAvoidingView
                  behavior="padding"
                  keyboardVerticalOffset={
                    Platform.OS === 'android' ? 85 : isIphone10() ? 105 : 80
                  }
                >
                  <ChatInput
                    onSend={this.submit}
                    uploadInProgress={this.state.uploadInProgress}
                  />
                </KeyboardAvoidingView>
              </ScreenWrapper>
            );
          } else {
            return (
              <ScreenWrapper
                styles={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <UIActivityIndicator color={'#FFFFFF'} />
                <Text style={{ marginTop: 15, fontSize: 20, color: '#FFFFFF' }}>
                  Decrypting Messages
                </Text>
              </ScreenWrapper>
            );
          }
        }}
      </Query>
    );
  }
}

const DMChannelWithAllGarbage = withGlobal(({ user, activeChannel }) => ({
  user,
  activeChannel,
}))(
  compose(
    graphql(CREATE_MESSAGE, { name: 'createMessage' }),
    graphql(GET_USER_KEYS, {
      name: 'getUserKeys',
      options: ({ user, activeChannel }) => ({
        variables: { user: user, channel: activeChannel },
      }),
    }),
  )(DMChannelWithoutDrawer),
);

export default createDrawerNavigator(
  {
    DMChannel: {
      screen: DMChannelWithAllGarbage,
    },
  },
  {
    contentComponent: Menu,
    drawerPosition: 'right',
    drawerWidth: 350,
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
});
