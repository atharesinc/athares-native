import React, { useState } from 'reactn';
import ScreenWrapper from '../../../components/ScreenWrapper';
import AvatarPicker from '../../../components/AvatarPicker';
import InfoLine from '../../../components/InfoLine';
import Statistic from '../../../components/Statistic';
import SwitchLine from '../../../components/SwitchLine';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { ImageManipulator } from 'expo';
import debounce from 'lodash.debounce';
import {
  UPDATE_ALLOW_MARKETING_EMAIL,
  UPDATE_USER,
} from '../../../graphql/mutations';

import {
  GET_USER_BY_ID_ALL,
  GET_USER_PREF_BY_ID,
} from '../../../graphql/queries';

import { graphql, compose } from 'react-apollo';

function Me({ loading, data: { User: userPref }, getUser, ...props }) {
  const [uri, setUri] = useState(null);

  const updatePref = async checked => {
    let { id } = props.data.User.prefs;

    await props.updateMarketingEmail({
      variables: {
        id,
        flag: checked,
      },
    });
  };
  const updateURI = async uri => {
    if (uri !== props.getUser.User.icon) {
      uri = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 200, height: 200 } }],
        { format: 'png', compress: 0.5, base64: true },
      );
      uri = 'data:image/png;base64,' + uri.base64;
    }
    updateUser({ icon: uri });
  };

  const updatePhone = text => {
    debounce(
      () => {
        updateUser({ phone: text });
      },
      1000,
      { leading: false, trailing: true },
    );
  };
  // updateEmail = text => {
  //   updateUser({ email: text })
  // };
  const updateName = text => {
    debounce(
      () => {
        updateUser({
          uname: text,
        });
      },
      1000,
      { leading: false, trailing: true },
    );
  };
  const updateUser = async updates => {
    try {
      // create circle
      const {
        getUser: { User: user },
      } = props;

      let updatedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        uname: user.uname,
        icon: user.icon,
        ...updates,
      };

      await props.updateUser({
        variables: {
          id: props.userId,
          ...updatedUser,
        },
      });
    } catch (err) {
      console.error(err.message);
      Alert.alert('Error', 'There was an error updating your profile.');
    }
  };

  if (loading || !userPref || !getUser.User) {
    return (
      <ScreenWrapper
        styles={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <UIActivityIndicator color={'#FFFFFF'} />
      </ScreenWrapper>
    );
  }

  const user = getUser.User;
  const stats = {
    voteCount: user.votes.length,
    circleCount: user.circles.length,
    revisionCount: user.revisions.length,
    passedRevisionCount: user.revisions.filter(r => r.passed).length,
  };

  return (
    <ScreenWrapper styles={styles.wrapper}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView styles={styles.wrapper}>
          <ImageBackground
            source={require('../../../assets/nasa-earth.jpg')}
            style={styles.backgroundImage}
          >
            <View style={styles.userAndImageWrapper}>
              <Text style={styles.userNameText}>
                {user.firstName + ' ' + user.lastName}
              </Text>
              <AvatarPicker
                uri={user.uri}
                onImageChange={updateURI}
                rounded={true}
              />
            </View>
          </ImageBackground>
          {/* Info */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Info</Text>
            <InfoLine
              icon={'phone'}
              label={'Phone'}
              value={user.phone}
              onChangeText={updatePhone}
            />
            <InfoLine
              icon={'at-sign'}
              label={'Email'}
              value={user.email}
              onChangeText={updateEmail}
            />
            <InfoLine
              icon={'hash'}
              label={'Unique Name'}
              value={user.uname}
              onChangeText={updateName}
            />
          </View>

          {/* Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Statistics</Text>
            <View style={styles.wrapSection}>
              <Statistic header="Circles" text={stats.circleCount} />
              <Statistic
                header="Revisions Proposed"
                text={stats.revisionCount}
              />
              <Statistic
                header="Revisions Accepted"
                text={stats.passedRevisionCount}
              />
              <Statistic header="Times Voted" text={stats.voteCount} />
              <Statistic
                header="User Since"
                text={new Date(user.createdAt).toLocaleDateString()}
              />
            </View>
          </View>
          <View style={[styles.section, { marginBottom: 50 }]}>
            <Text style={styles.sectionHeading}>User Preferences</Text>
            <SwitchLine
              onPress={updatePref}
              label={'Allow Marketing Emails'}
              value={userPref.prefs.maySendMarketingEmail}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

export default compose(
  graphql(GET_USER_BY_ID_ALL, {
    name: 'getUser',
    options: ({ userId }) => ({ variables: { id: userId || '' } }),
  }),
  graphql(UPDATE_USER, { name: 'updateUser' }),
  graphql(UPDATE_ALLOW_MARKETING_EMAIL, { name: 'updateMarketingEmail' }),
  graphql(GET_USER_PREF_BY_ID, {
    options: ({ userId }) => ({ variables: { id: userId || '' } }),
  }),
)(Me);

const styles = StyleSheet.create({
  header: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 13,
    color: '#FFFFFFb7',
    marginBottom: 25,
  },
  wrapper: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  userAndImageWrapper: {
    flex: 1,
    padding: 15,
    width: '100%',
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 15,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 15,
    color: '#FFFFFFb7',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFF',
  },
  picker: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginTop: {
    marginTop: 15,
  },
  wrapSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
