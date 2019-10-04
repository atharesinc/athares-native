import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pull } from '../redux/state/reducers';
import { GET_ALL_USERS_CIRCLES_CHANNELS } from '../graphql/queries';
import { SUB_TO_ALL_CIRCLES_CHANNELS } from '../graphql/subscriptions';
import { Query, graphql } from 'react-apollo';
import { updateChannels, addUnreadChannel } from '../redux/state/actions';

class ChannelUpdateMonitor extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.getAllMyChannels.User &&
      this.props.getAllMyChannels.User !== prevProps.getAllMyChannels.User
    ) {
      let { circles } = this.props.getAllMyChannels.User;
      let channels = circles.map(c => c.channels).flat(1);

      channels = channels.map(c => c.id);
      // set the user's current channels
      this.props.dispatch(updateChannels(channels));
    }
  }
  _subToMore = subscribeToMore => {
    subscribeToMore({
      document: SUB_TO_ALL_CIRCLES_CHANNELS,
      variables: { ids: this.props.channels || [] },
      updateQuery: (prev, { subscriptionData }) => {
        let updatedChannel = subscriptionData.data.Message.node.channel.id;
        if (subscriptionData.data.Message.node.user.id === this.props.user) {
          return prev;
        }
        if (this.props.activeChannel !== updatedChannel) {
          if (
            this.props.channels.findIndex(ch => ch === updatedChannel) !== -1
          ) {
            this.props.dispatch(addUnreadChannel(updatedChannel));
          }
          return prev;
        }
      },
    });
  };
  render() {
    return (
      <Query
        query={GET_ALL_USERS_CIRCLES_CHANNELS}
        variables={{ id: this.props.user || '' }}
      >
        {({ subscribeToMore }) => {
          if (this.props.getAllMyChannels.User) {
            this._subToMore(subscribeToMore);
          }
          return null;
        }}
      </Query>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: pull(state, 'user'),
    activeChannel: pull(state, 'activeChannel'),
    channels: pull(state, 'channels'),
    unreadChannels: pull(state, 'unreadChannels'),
  };
}
export default connect(mapStateToProps)(
  graphql(GET_ALL_USERS_CIRCLES_CHANNELS, {
    name: 'getAllMyChannels',
    options: ({ user }) => ({ variables: { id: user || '' } }),
  })(ChannelUpdateMonitor),
);
