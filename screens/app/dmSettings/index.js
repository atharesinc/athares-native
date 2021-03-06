import React, { useGlobal, useState, withGlobal } from 'reactn';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
// import { UIActivityIndicator } from 'react-native-indicators';
import { NavigationActions } from 'react-navigation';
import Icon from '@expo/vector-icons/Feather';
import SimpleCrypto from 'simple-crypto-js';
import { compose, graphql } from 'react-apollo';
import ScreenWrapper from '../../../components/ScreenWrapper';
import PortalButton from '../../../components/PortalButton';
import InviteUser from '../../../components/InviteUser';
import Tag from './Tag';

import {
  GET_USERS_BY_CHANNEL_ID,
  GET_USER_KEYS,
} from '../../../graphql/queries';
import {
  ADD_USER_TO_CHANNEL,
  CREATE_KEY,
  UPDATE_CHANNEL_NAME,
  DELETE_USER_FROM_DM,
  DELETE_USER_KEY,
} from '../../../graphql/mutations';
import { encrypt, decrypt } from '../../../utils/crypto';

function DMSettings(props) {
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');

  const [loading, setLoading] = useState(false);
  const [showAddUsers, setShowAddUsers] = useState(false);
  const [tags, setTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const confirmLeave = () => {
    Alert.alert(
      'Leave Circle?',
      "Are you sure you'd like to leave this Channel?",
      [
        {
          text: 'Yes, Leave',
          onPress: () => leave(),
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true },
    );
  };
  const leave = async () => {
    const { activeChannel, user, updateChannelName } = props;

    try {
      // real quick, get the existing channel's name, and remove our name from it
      const channelName = props.getUsers.Channel.users
        .filter(u => u.id !== user)
        .map(u => `${u.firstName} ${u.lastName}`)
        .join(', ');

      updateChannelName({
        variables: {
          id: activeChannel,
          name: channelName,
        },
      });
      const res = await props.deleteUserFromDM({
        variables: {
          user,
          channel: activeChannel,
        },
      });
      const { id } = res.data.removeFromUsersOnChannels.usersUser.keys[0];

      await props.deleteUserKey({
        variables: {
          id,
        },
      });

      Alert.alert(
        'Removed From Channel',
        'You have left this channel. You will have to be re-invited to participate at a later time.',
      );
      setActiveChannel(null);
      close();
      navigateToScreen('Dashboard');
    } catch (err) {
      console.error(new Error(err));
      Alert.alert('Error', 'There was an error leaving this channel.');
    }
  };
  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };

  const handleDelete = index => {
    console.log('delete me 2', index);
    console.log(tags);
    const tagsSelected = tags;
    tagsSelected.splice(index, 1);
    setTags(tagsSelected);
  };

  const renderTags = tagsToRender =>
    tagsToRender.map((t, i) => (
      <Tag key={t.id} handleDelete={handleDelete} i={i} tag={t} />
    ));

  const submit = async () => {
    // hoo boy theres a lot to do here
    const { activeChannel, updateChannelName } = props;
    const { User: user } = props.getUserKeys;
    // get the users encrypted priv key
    const userChannelKey = user.keys[0].key;
    const myToken = AsyncStorage.getItem('ATHARES_HASH');

    // decrypt user's priv with stored token
    const simpleCrypto = new SimpleCrypto(myToken);

    const userPriv = simpleCrypto.decrypt(user.priv);

    try {
      // decrypt this user's channel key
      const decryptedChannelSecret = decrypt(userChannelKey, userPriv);

      // for each new user, encrypt the sym key
      // add connection from new user to channel
      // add each users key
      // give each user an encrypted copy of this keypair and store it in
      const promiseList = selectedUsers.map(async u => {
        const encryptedKey = encrypt(decryptedChannelSecret, u.pub);
        return props.createKey({
          variables: {
            key: encryptedKey,
            user: u.id,
            channel: activeChannel,
          },
        });
      });

      // add each user to this channel
      const promiseList2 = selectedUsers.map(u =>
        props.addUserToChannel({
          variables: {
            channel: activeChannel,
            user: u.id,
          },
        }),
      );
      const { users: existingUsers } = props.getUsers.Channel;
      const allUsers = [...selectedUsers, ...existingUsers];

      const channelName = allUsers
        .map(u => `${u.firstName} ${u.lastName}`)
        .join(', ');

      // store all the keys, add all the users, and update the channel name
      await Promise.all(promiseList);
      await Promise.all(promiseList2);
      updateChannelName({
        variables: {
          id: activeChannel,
          name: channelName,
        },
      });
      setTags([]);

      props.getUsers.refetch();
      Alert.alert('Users Added', 'Successfully added users');
    } catch (err) {
      console.error(new Error(err));
      Alert.alert('Error', 'There was an error adding users at this time');
    }
  };
  const close = () => {
    props.navigation.toggleDrawer();
  };

  return (
    <ScreenWrapper styles={[styles.wrapper]}>
      <View style={[styles.lineItem, { backgroundColor: '#2f3242' }]}>
        <Text style={styles.sectionHeading}>Settings</Text>
        <TouchableOpacity style={styles.center} onPress={close}>
          <Icon name="x" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="position">
        <ScrollView styles={[styles.wrapper]}>
          <View style={styles.lineItem}>
            <Text style={styles.sectionHeading}>Add User</Text>
            <Icon name="user-plus" size={20} color="#FFFFFF" />
          </View>
          {tags.length !== 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.toText}>Invite:</Text>
              <ScrollView contentContainerStyle={styles.tagsList} horizontal>
                {renderTags(tags)}
              </ScrollView>
              <TouchableOpacity style={styles.addButton} onPress={submit}>
                <Icon name="plus" size={20} color="#00dffc" />
              </TouchableOpacity>
            </View>
          )}
          <InviteUser
            tags={tags}
            updateTags={setTags}
            onFocusChange={setIsFocused}
          />

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Leave Channel</Text>
            <Text style={styles.disclaimer}>
              {`By pressing "Leave Channel" you will be removed from this channel, and any messages or files you shared will not be
                accessible by you. If you would like to return to this channel at a later date, you will need to be re-invited by someone inside the channel.`}
            </Text>
            <PortalButton
              style={styles.repealButton}
              textStyle={styles.repealText}
              title="Leave Channel"
              onPress={leave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

export default withGlobal(({ user, activeChannel }) => ({
  user,
  activeChannel,
}))(
  compose(
    graphql(ADD_USER_TO_CHANNEL, { name: 'addUserToChannel' }),
    graphql(UPDATE_CHANNEL_NAME, { name: 'updateChannelName' }),
    graphql(CREATE_KEY, { name: 'createKey' }),
    graphql(GET_USER_KEYS, {
      name: 'getUserKeys',
      options: ({ activeChannel, user }) => ({
        variables: { channel: activeChannel || '', user: user || '' },
      }),
    }),
    graphql(GET_USERS_BY_CHANNEL_ID, {
      name: 'getUsers',
      options: ({ activeChannel }) => ({
        variables: { id: activeChannel || '' },
      }),
    }),
  )(DMSettings),
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    backgroundColor: '#282a38',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineItem: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 25,
    height: 25,
    borderColor: '#00dffc',
    borderRadius: 9999,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tagsWrapper: {
    backgroundColor: '#3a3e52',
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tagsList: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  toText: {
    color: '#FFFFFF80',
    marginRight: 5,
    marginLeft: 15,
    fontSize: 15,
  },
  tag: {
    borderColor: '#00DFFC',
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  tagText: {
    color: '#00DFFC',
    fontSize: 15,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    paddingBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 15,
    color: '#FFFFFFb7',
    marginBottom: 20,
  },
  repealButton: {
    marginTop: 20,
    borderColor: '#ff725c',
    borderWidth: 2,
    backgroundColor: '#282a38',
  },
  repealText: {
    color: '#ff725c',
  },
});
