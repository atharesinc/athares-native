import React, { Component } from 'reactn';
import { GET_DMS_BY_USER } from '../graphql/queries';
import { SUB_TO_DMS_BY_USER } from '../graphql/subscriptions';
import { Query, graphql } from 'react-apollo';

class ChannelUpdateMonitor extends Component {
  constructor() {
    super();
    this.toggleTitle = null;
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.getDMs.User &&
      this.props.getDMs.User !== prevProps.getDMs.User
    ) {
      let { channels } = this.props.getDMs.User;
      let dms = channels.map(c => c.id);
      // set the user's current DMs
      this.setGlobal({ dms });
    }
  }
  playAudio = () => {
    let audio = new Audio('/img/job-done.mp3');
    audio.volume = 0.2;
    audio.play();
  };
  _subToMore = subscribeToMore => {
    subscribeToMore({
      document: SUB_TO_DMS_BY_USER,
      variables: { ids: this.global.dms || [] },
      updateQuery: (prev, { subscriptionData }) => {
        let updatedChannel = subscriptionData.data.Message.node.channel.id;
        if (subscriptionData.data.Message.node.user.id === this.global.user) {
          return prev;
        }
        // this.playAudio();
        if (this.global.activeChannel === updatedChannel) {
          // auditory cue that a new message has been created
          return prev;
        } else {
          if (this.global.dms.findIndex(dm => dm === updatedChannel) !== -1) {
            addUnreadDM(updatedChannel);

            // flash title and play sound to get user's attention
            this.flashTab(subscriptionData.data.Message.node.user.firstName);
          }
          return prev;
        }
      },
    });
  };
  addUnreadDM = dm => {
    let { unreadDMs } = this.global;
    if (!unreadDMs.includes(dm)) {
      this.setGlobal({
        unreadDMs: [...this.global.unreadDMs, updatedChannel],
      });
    }
  };

  flashTab = firstName => {
    // clearInterval(this.toggleTitle);
    // let prevTitle = `(${this.props.unreadDMs.length}) New Message!`;
    // let newTitle = `(${
    //     this.props.unreadDMs.length
    //     }) ${firstName} sent a message`;
    // document.title = newTitle;
    // this.toggleTitle = setInterval(() => {
    //     switch (document.title) {
    //         case newTitle:
    //             document.title = prevTitle;
    //             break;
    //         case prevTitle:
    //             document.title = newTitle;
    //             break;
    //         default:
    //             document.title = prevTitle;
    //     }
    // }, 1500);
    // this.toggleTitle;
  };
  render() {
    return (
      <Query query={GET_DMS_BY_USER} variables={{ id: this.global.user || '' }}>
        {({ subscribeToMore }) => {
          if (this.props.getDMs.User) {
            this._subToMore(subscribeToMore);
          }
          return null;
        }}
      </Query>
    );
  }
}

export default graphql(GET_DMS_BY_USER, {
  name: 'getDMs',
  options: ({ user }) => ({ variables: { id: user || '' } }),
})(ChannelUpdateMonitor);
