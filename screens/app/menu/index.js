import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, StyleSheet } from 'react-native';
import UserLink from '../../../components/UserLink';
import MenuLink from '../../../components/MenuLink';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { Linking } from 'expo';

import { connect } from 'react-redux';
import { logout } from '../../../redux/state/actions';
import { pull } from '../../../redux/state/reducers';
import { Query } from 'react-apollo';
import { GET_USER_BY_ID } from '../../../graphql/queries';

function SideMenu(props) {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };
  logoutUser = async () => {
    props.dispatch(logout());
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
      variables={{ id: props.userId || '' }}
      pollInterval={30000}
    >
      {({ data }) => {
        let user = null;
        if (data.User) {
          user = data.User;
        }
        return (
          <ScreenWrapper styles={[styles.wrapper]}>
            {/* User */}
            {user ? (
              <UserLink onPress={goToProfile} user={user} />
            ) : (
              <MenuLink icon='log-in' label='Login' onPress={goToLogin} />
            )}
            <ScrollView>
              {/* Links */}
              <MenuLink
                icon='help-circle'
                label='About'
                details='FAQs and Us'
                onPress={goToAbout}
              />
              <MenuLink
                icon='info'
                label='Privacy'
                details='Privacy Policy and Terms of Use'
                onPress={goToPolicy}
              />
              {user && (
                <MenuLink icon='log-out' label='Log out' onPress={logoutUser} />
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

function mapStateToProps(state) {
  return {
    userId: pull(state, 'user'),
  };
}
export default connect(mapStateToProps)(SideMenu);
