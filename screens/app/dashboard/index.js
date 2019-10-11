import React, { Component, Fragment } from 'reactn';

import { ScrollView, View, Text } from 'react-native';
import Footer from '../../../components/Footer';
import Circles from '../../../components/Circles';
import ChannelItem from '../../../components/ChannelItem';
import ChannelGroupHeader from '../../../components/ChannelGroupHeader';
import CircleHeader from '../../../components/CircleHeader';
import GovernanceChannelItem from '../../../components/GovernanceChannelItem';
import {
  GET_CHANNELS_BY_CIRCLE_ID,
  GET_DMS_BY_USER,
  IS_USER_IN_CIRCLE,
} from '../../../graphql/queries';
import { Query, graphql, compose } from 'react-apollo';
import { Search } from './Search';

const pullUI = require('../../../redux/ui/reducers').pull;

function Dashboard({
  activeCircle,
  getDMsByUser,
  unreadDMs,
  unreadChannels,
  isUserInCircle,
  showSearch,
  ...props
}) {
  let belongsToCircle = false;
  let user = null;
  let circle = null;
  let channels = [];
  let dms = [];
  // get channel data, if any
  if (getDMsByUser.User && getDMsByUser.User.channels) {
    dms = getDMsByUser.User.channels.map(dm => ({
      unread: unreadDMs.includes(dm.id),
      ...dm,
    }));
    user = getDMsByUser.User;
    user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    // see if the user actually belongs to this circle
    if (
      isUserInCircle.allCircles &&
      isUserInCircle.allCircles.length !== 0 &&
      isUserInCircle.allCircles[0].id === activeCircle
    ) {
      belongsToCircle = true;
    }
  }

  return (
    <Query
      query={GET_CHANNELS_BY_CIRCLE_ID}
      variables={{ id: activeCircle || '' }}
      pollInterval={3000}
    >
      {({ data }) => {
        if (data.Circle) {
          circle = data.Circle;
          channels = circle.channels;
          channels = channels.map(ch => ({
            unread: unreadChannels.includes(ch.id),
            ...ch,
          }));
        }
        return (
          <View
            style={{
              alignItems: 'stretch',
              justifyContent: 'space-between',
              width: '100%',
              flex: 1,
              backgroundColor: '#282a38',
            }}
          >
            {showSearch ? <Search /> : null}
            <Circles loggedIn={user} />
            <ScrollView
              contentContainerStyle={{
                backgroundColor: '#282a38',
                flexGrow: 1,
              }}
            >
              {circle && (
                <Fragment>
                  <ChannelGroupHeader title={'GOVERNANCE'} />
                  <GovernanceChannelItem
                    title={'Constitution'}
                    link={'Constitution'}
                  />
                  <GovernanceChannelItem title={'Polls'} link={'Revisions'} />
                  {user &&
                    belongsToCircle && (
                      <GovernanceChannelItem
                        title={'Settings'}
                        link={'CircleSettings'}
                      />
                    )}
                  <ChannelGroupHeader
                    title={'CHANNELS'}
                    displayPlus={user && belongsToCircle}
                  />

                  {channels.map(ch => (
                    <ChannelItem
                      key={ch.id}
                      showUnread={ch.unread}
                      channel={ch}
                    />
                  ))}
                </Fragment>
              )}
              <ChannelGroupHeader
                title={'DIRECT MESSAGES'}
                displayPlus={true}
              />
              {dms.map(ch => (
                <ChannelItem key={ch.id} showUnread={ch.unread} channel={ch} />
              ))}
            </ScrollView>
            <Footer loggedIn={user} belongsToCircle={belongsToCircle} />
          </View>
        );
      }}
    </Query>
  );
}

function mapStateToProps(state) {
  return {
    user: pull(state, 'user'),
    activeCircle: pull(state, 'activeCircle'),
    unreadDMs: pull(state, 'unreadDMs'),
    unreadChannels: pull(state, 'unreadChannels'),
    showSearch: pullUI(state, 'showSearch'),
  };
}

export default compose(
  graphql(IS_USER_IN_CIRCLE, {
    name: 'isUserInCircle',
    options: ({ activeCircle, user }) => ({
      variables: { circle: activeCircle || '', user: user || '' },
    }),
  }),
  graphql(GET_DMS_BY_USER, {
    name: 'getDMsByUser',
    options: ({ user }) => ({
      pollInterval: 5000,
      variables: { id: user || '' },
    }),
  }),
)(Dashboard);
