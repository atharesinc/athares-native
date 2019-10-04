import React, { Component } from 'react';

import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from '@expo/vector-icons/Feather';
import { connect } from 'react-redux';
import { toggleSearch as toggleSearchAction } from '../redux/ui/actions';
import { pull } from '../redux/state/reducers';
import { toggleDMSettings } from '../redux/ui/actions';
import { Query } from 'react-apollo';
import {
  GET_USER_BY_ID,
  GET_MESSAGES_FROM_CHANNEL_ID,
  GET_REVISION_BY_ID,
  GET_CIRCLE_NAME_BY_ID,
} from '../graphql/queries';
import AsyncImageAnimated from 'react-native-async-image-animated';

const pullUI = require('../redux/ui/reducers').pull;

function Header({
  loggedIn = false,
  belongsToCircle = false,
  showSearch = false,
  scene,
  user = null,
  activeChannel,
  activeRevision,
  viewUser,
  ...props
}) {
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };
  const toggleSearch = () => {
    props.dispatch(toggleSearchAction());
  };
  const back = () => {
    props.navigation.goBack(null);
  };
  const more = () => {
    let { routeName } = scene.route;
    if (routeName === 'DMChannel') {
      props.dispatch(toggleDMSettings());
    }
  };
  const createRevision = () => {
    props.navigation.navigate('CreateRevision');
  };

  const { routeName } = scene.route;
  const routeTitleIndex = /[A-Z]/.exec('createChannel').index;

  const simpleChannelsArr = [
    'CreateCircle',
    'CircleSettings',
    'Constitution',
    'CreateChannel',
    'AddUser',
    'Revisions',
    'CreateDM',
    'CreateRevision',
    'EditAmendment',
  ];

  const simpleChannelsObj = {
    CreateCircle: 'Create Circle',
    CircleSettings: 'Circle Settings',
    Constitution: 'Constitution',
    CreateChannel: 'Create Channel',
    AddUser: 'Add User',
    Revisions: 'Revisions',
    CreateDM: 'New Message',
    CreateRevision: 'Create Revision',
    EditAmendment: 'Edit Amendment',
  };
  // render screen name and back
  if (simpleChannelsArr.indexOf(routeName) !== -1) {
    return (
      <View
        style={[
          styles.header,
          styles.headerThemeDark,
          routeName === 'Revisions' ? styles.headerTheme : {},
        ]}
      >
        <TouchableOpacity onPress={back}>
          <Icon name='chevron-left' size={25} color={'#FFFFFF'} />
        </TouchableOpacity>
        <Text style={styles.headerText} numberOfLines={1}>
          {simpleChannelsObj[routeName]}
        </Text>
        {routeName === 'Constitution' ? (
          <TouchableOpacity onPress={createRevision}>
            <Icon name='plus' size={25} color={'#FFFFFF'} />
          </TouchableOpacity>
        ) : (
          <Icon name='more-vertical' size={25} color={'transparent'} />
        )}
      </View>
    );
  }
  // render channelName and back
  if (['Channel', 'DMChannel'].indexOf(routeName) !== -1) {
    return (
      <Query
        query={GET_MESSAGES_FROM_CHANNEL_ID}
        variables={{ id: activeChannel || '' }}
      >
        {({ data }) => {
          return (
            <View style={[styles.header, styles.headerThemeDark]}>
              <TouchableOpacity onPress={back}>
                <Icon name='chevron-left' size={25} color={'#FFFFFF'} />
              </TouchableOpacity>
              {data.Channel && (
                <Text style={styles.headerText} numberOfLines={1}>
                  {data.Channel.name}
                </Text>
              )}
              {routeName === 'DMChannel' ? (
                <TouchableOpacity onPress={more}>
                  <Icon name='more-vertical' size={25} color={'#FFFFFF'} />
                </TouchableOpacity>
              ) : (
                <Icon name='more-vertical' size={25} color={'transparent'} />
              )}
            </View>
          );
        }}
      </Query>
    );
  }
  // render revision name and back
  if (routeName === 'ViewRevision') {
    return (
      <Query query={GET_REVISION_BY_ID} variables={{ id: activeRevision }}>
        {({ data }) => {
          return (
            <View style={[styles.header, styles.headerThemeDark]}>
              <TouchableOpacity onPress={back}>
                <Icon name='chevron-left' size={25} color={'#FFFFFF'} />
              </TouchableOpacity>
              {data.Revision && (
                <Text style={styles.headerText} numberOfLines={1}>
                  {data.Revision.title}
                </Text>
              )}
              <Icon name='more-vertical' size={25} color={'transparent'} />
            </View>
          );
        }}
      </Query>
    );
  }
  // render username and back
  if (['ViewUser', 'ViewOtherUser'].indexOf(routeName) !== -1) {
    return (
      <Query query={GET_USER_BY_ID} variables={{ id: viewUser || user || '' }}>
        {({ data }) => {
          return (
            <View style={[styles.header, styles.headerThemeDark]}>
              <TouchableOpacity onPress={back}>
                <Icon name='chevron-left' size={25} color={'#FFFFFF'} />
              </TouchableOpacity>
              {data.User && (
                <Text style={styles.headerText} numberOfLines={1}>
                  {data.User.firstName + ' ' + data.User.lastName}
                </Text>
              )}
              <Icon name='more-vertical' size={25} color={'transparent'} />
            </View>
          );
        }}
      </Query>
    );
  }
  // render dashboard with user drawer
  return (
    <Query
      query={GET_USER_BY_ID}
      variables={{ id: user || '' }}
      pollInterval={2000}
    >
      {({ loading, err, data }) => {
        if (data.User) {
          const img = data.User.icon
            ? { uri: data.User.icon }
            : require('../assets/user-default.png');
          return (
            <Query
              query={GET_CIRCLE_NAME_BY_ID}
              variables={{ id: props.activeCircle || '' }}
            >
              {({ data: circleNameData = {} }) => {
                let name = '';
                if (circleNameData.Circle) {
                  name = circleNameData.Circle.name;
                }
                return (
                  <View style={styles.header}>
                    <TouchableOpacity onPress={toggleDrawer}>
                      <View style={styles.userIconWrapper}>
                        <AsyncImageAnimated
                          source={img}
                          style={styles.userIcon}
                          placeholderColor={'#3a3e52'}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 15,
                        letterSpacing: 2,
                        padding: 5,
                        paddingHorizontal: 10,
                      }}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}
                    >
                      {name}
                    </Text>
                    {!showSearch ? (
                      <TouchableOpacity onPress={toggleSearch}>
                        <Icon name='search' size={25} color={'#FFFFFF'} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={toggleSearch}>
                        <Icon
                          name='x'
                          size={25}
                          color={'#FFFFFF'}
                          numberOfLines={1}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
            </Query>
          );
        }
        return <View style={styles.header}></View>;
      }}
    </Query>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#282a38',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    zIndex: 0,
  },
  headerThemeDark: {
    backgroundColor: '#282a38',
  },
  headerTheme: {
    backgroundColor: '#2f3242',
  },
  headerThemeLighter: {
    backgroundColor: '#3a3e52',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  userIcon: {
    height: 35,
    width: 35,
  },
  userIconWrapper: {
    borderRadius: 9999,
    borderColor: '#FFFFFF',
    borderWidth: 3,
    height: 40,
    width: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    user: pull(state, 'user'),
    activeCircle: pull(state, 'activeCircle'),
    activeChannel: pull(state, 'activeChannel'),
    viewUser: pull(state, 'viewUser'),
    activeRevision: pull(state, 'activeRevision'),
    dmSettings: pullUI(state, 'dmSettings'),
    showSearch: pullUI(state, 'showSearch'),
  };
}
export default connect(mapStateToProps)(withNavigation(Header));
