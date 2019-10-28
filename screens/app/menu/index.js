import React, { useGlobal } from 'reactn';
import { NavigationActions } from 'react-navigation';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Linking } from 'expo';
import { Query } from 'react-apollo';
import UserLink from '../../../components/UserLink';
import MenuLink from '../../../components/MenuLink';
import ScreenWrapper from '../../../components/ScreenWrapper';

import { GET_USER_BY_ID } from '../../../graphql/queries';

function SideMenu(props) {
  const [, setActiveChannel] = useGlobal('activeChannel');
  const [, setActiveCircle] = useGlobal('activeCircle');
  const [, setActiveRevision] = useGlobal('activeRevision');
  const [user, setUser] = useGlobal('user');
  const [, setPub] = useGlobal('pub');
  const [, setActiveAmendment] = useGlobal('setActiveAmendment');
  const [, setChannels] = useGlobal('setChannels');
  const [, setUnreadChannels] = useGlobal('setUnreadChannels');
  const [, setDMs] = useGlobal('setDMs');
  const [, setUnreadDMs] = useGlobal('setUnreadDMs');

  const navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };

  const logout = async () => {
    setActiveChannel(null);
    setActiveCircle(null);
    setActiveRevision(null);
    setUser(null);
    setPub(null);
    setActiveAmendment(null);
    setChannels([]);
    setUnreadChannels([]);
    setDMs([]);
    setUnreadDMs([]);
    await AsyncStorage.multiRemove([
      'ATHARES_ALIAS',
      'ATHARES_HASH',
      'ATHARES_TOKEN',
    ]);
    props.navigation.navigate('Login');
  };

  const goToLogin = () => {
    props.navigation.navigate('Login');
  };

  const goToProfile = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ViewUser',
    });
    props.navigation.dispatch(navigateAction);
  };

  const goToAbout = () => {
    Linking.openURL('https://www.athares.us/about');
  };

  const goToPolicy = () => {
    Linking.openURL('https://www.athares.us/policy');
  };

  return (
    <Query
      query={GET_USER_BY_ID}
      variables={{ id: user || '' }}
      pollInterval={30000}
    >
      {({ data }) => {
        let userObj = null;
        if (data.User) {
          userObj = data.User;
        }
        return (
          <ScreenWrapper styles={[styles.wrapper]}>
            {/* User */}
            {userObj ? (
              <UserLink onPress={goToProfile} user={userObj} />
            ) : (
              <MenuLink icon="log-in" label="Login" onPress={goToLogin} />
            )}
            <ScrollView>
              {/* Links */}
              <MenuLink
                icon="help-circle"
                label="About"
                details="FAQs and Us"
                onPress={goToAbout}
              />
              <MenuLink
                icon="info"
                label="Privacy"
                details="Privacy Policy and Terms of Use"
                onPress={goToPolicy}
              />
              {userObj && (
                <MenuLink icon="log-out" label="Log out" onPress={logout} />
              )}
            </ScrollView>
          </ScreenWrapper>
        );
      }}
    </Query>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#2f3242',
  },
  userLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 9999,
  },
  header: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 14,
    color: '#FFFFFFb7',
  },
});

export default SideMenu;
