import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation CREATE_USER(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $icon: String!
    $pub: String!
    $priv: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      authProvider: { email: { email: $email, password: $password } }
      icon: $icon
      pub: $pub
      priv: $priv
    ) {
      id
      firstName
      lastName
      email
      icon
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SIGNIN_USER($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
        firstName
        lastName
        icon
        uname
        phone
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phone: String
    $uname: String
    $icon: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      uname: $uname
      icon: $icon
    ) {
      id
    }
  }
`;

export const CREATE_CIRCLE = gql`
  mutation createCircle($icon: String!, $name: String!, $preamble: String!) {
    createCircle(icon: $icon, name: $name, preamble: $preamble) {
      id
    }
  }
`;

// use this with creating circle or when inviting users
// we also create a permission object for this circle and user
export const ADD_USER_TO_CIRCLE = gql`
  mutation addCircleToUser($circle: ID!, $user: ID!) {
    addToUserOnCircles(circlesCircleId: $circle, usersUserId: $user) {
      usersUser {
        circles {
          id
        }
      }
      circlesCircle {
        users {
          id
        }
      }
    }
    createCirclePermission(
      amendments: false
      revisions: false
      useEmail: false
      usePush: true
      useSMS: false
      circleId: $circle
      userId: $user
    ) {
      id
    }
  }
`;
export const CREATE_CHANNEL = gql`
  mutation createChannel(
    $name: String!
    $description: String
    $channelType: String!
  ) {
    createChannel(
      channelType: $channelType
      name: $name
      description: $description
    ) {
      id
    }
  }
`;
export const ADD_CHANNEL_TO_CIRCLE = gql`
  mutation addChannelToCircle($channel: ID!, $circle: ID!) {
    addToCircleOnChannels(
      channelsChannelId: $channel
      circleCircleId: $circle
    ) {
      circleCircle {
        id
        name
      }
      channelsChannel {
        id
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage(
    $text: String!
    $user: ID!
    $channel: ID!
    $file: String
    $fileName: String
  ) {
    createMessage(
      text: $text
      channelId: $channel
      userId: $user
      file: $file
      fileName: $fileName
    ) {
      id
    }
  }
`;

export const CREATE_REVISION = gql`
  mutation createRevision(
    $newText: String!
    $oldText: String
    $circle: ID!
    $user: ID!
    $title: String!
    $amendment: ID
    $expires: DateTime!
    $voterThreshold: Int!
    $hash: String!
    $repeal: Boolean!
  ) {
    createRevision(
      newText: $newText
      oldText: $oldText
      circleId: $circle
      backerId: $user
      title: $title
      amendmentId: $amendment
      expires: $expires
      voterThreshold: $voterThreshold
      hash: $hash
      repeal: $repeal
    ) {
      id
      passed
      amendment {
        id
      }
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($support: Boolean!, $user: ID!, $revision: ID!) {
    createVote(support: $support, userId: $user, revisionId: $revision) {
      id
    }
  }
`;

export const UPDATE_VOTE = gql`
  mutation updateVote($vote: ID!, $support: Boolean!) {
    updateVote(id: $vote, support: $support) {
      id
      support
    }
  }
`;

export const CREATE_AMENDMENT_FROM_REVISION = gql`
  mutation createAmendmentFromRevsion(
    $text: String!
    $revision: ID!
    $title: String!
    $circle: ID!
    $hash: String!
  ) {
    updateRevision(id: $revision, passed: true) {
      passed
      id
    }
    createAmendment(
      text: $text
      title: $title
      circleId: $circle
      hash: $hash
    ) {
      id
      title
    }
  }
`;

export const UPDATE_AMENDMENT_FROM_REVISION = gql`
  mutation createAmendmentFromRevsion(
    $text: String!
    $revision: ID!
    $title: String!
    $amendment: ID!
    $hash: String!
  ) {
    updateRevision(id: $revision, passed: true) {
      passed
      id
    }
    updateAmendment(text: $text, title: $title, id: $amendment, hash: $hash) {
      id
      title
    }
  }
`;

export const UPDATE_AMENDMENT_FROM_REVISION_AND_DELETE = gql`
  mutation createAmendmentFromRevsion($revision: ID!, $amendment: ID!) {
    updateRevision(id: $revision, passed: true) {
      passed
      id
    }
    deleteAmendment(id: $amendment) {
      id
    }
  }
`;

export const DENY_REVISION = gql`
  mutation denyRevision($id: ID!) {
    updateRevision(id: $id, passed: false) {
      passed
      id
    }
  }
`;

export const DELETE_AMENDMENT = gql`
  mutation deleteAmendment($id: ID!) {
    deleteAmendment(id: $id) {
      id
    }
  }
`;

export const DELETE_USER_FROM_CIRCLE = gql`
  mutation($circle: ID!, $user: ID!) {
    removeFromUserOnCircles(circlesCircleId: $circle, usersUserId: $user) {
      usersUser {
        id
      }
      circlesCircle {
        id
      }
    }
  }
`;

export const CREATE_KEY = gql`
  mutation($key: String!, $user: ID!, $channel: ID!) {
    createKey(key: $key, userId: $user, channelId: $channel) {
      id
    }
  }
`;

/* this is for adding users to dm channels, otherwise they cant discover them */
export const ADD_USER_TO_CHANNEL = gql`
  mutation addUserToChannel($user: ID!, $channel: ID!) {
    addToUsersOnChannels(channelsChannelId: $channel, usersUserId: $user) {
      usersUser {
        id
      }
      channelsChannel {
        id
      }
    }
  }
`;

export const CREATE_INVITE = gql`
  mutation createInvite($inviter: ID!, $circle: ID!) {
    createInvite(inviterId: $inviter, circleId: $circle, hasAccepted: false) {
      id
    }
  }
`;

export const UPDATE_INVITE = gql`
  mutation updateInvite($id: ID!) {
    updateInvite(id: $id, hasAccepted: true) {
      id
    }
  }
`;

export const DELETE_USER_FROM_DM = gql`
  mutation deleteUserFromDM($channel: ID!, $user: ID!) {
    removeFromUsersOnChannels(channelsChannelId: $channel, usersUserId: $user) {
      usersUser {
        id
        keys(filter: { channel: { id: $channel } }) {
          id
        }
      }
      channelsChannel {
        id
      }
    }
  }
`;

export const DELETE_USER_KEY = gql`
  mutation($id: ID!) {
    deleteKey(id: $id) {
      id
    }
  }
`;
export const UPDATE_CHANNEL_NAME = gql`
  mutation($id: ID!, $name: String!) {
    updateChannel(id: $id, name: $name) {
      id
    }
  }
`;
// export const CREATE_WEB_SUB = gql`
//   mutation($sub: Json!, $user: ID!) {
//     createWebPushSubscription(subscription: $sub, userId: $user) {
//       id
//     }
//   }
// `;
// export const DELETE_WEB_SUB = gql`
//   mutation($id: ID!) {
//     deleteWebPushSubscription(id: $id) {
//       id
//     }
//   }
// `;

/* User Permissions */
export const CREATE_USER_PREF = gql`
  mutation createUserPref($id: ID!) {
    createUserPref(
      maySendMarketingEmail: true
      userDisabled: false
      userId: $id
    ) {
      id
    }
  }
`;

/* not used directly, but occurrs when adding a user to a circle */
export const CREATE_CIRCLE_PERMISSION = gql`
  mutation($circle: ID!, $user: ID!) {
    createCirclePermission(
      amendments: false
      revisions: false
      useEmail: false
      usePush: true
      useSMS: false
      circleId: $circle
      userId: $user
    ) {
      id
    }
  }
`;

export const UPDATE_AMENDEMENT_PERMISSION_FOR_CIRCLE = gql`
  mutation($flag: Boolean!, $id: ID!) {
    updateCirclePermission(id: $id, amendments: $flag) {
      id
      amendments
    }
  }
`;

export const UPDATE_REVISION_PERMISSION_FOR_CIRCLE = gql`
  mutation($flag: Boolean!, $id: ID!) {
    updateCirclePermission(id: $id, revisions: $flag) {
      id
      revisions
    }
  }
`;

export const UPDATE_EMAIL_PERMISSION_FOR_CIRCLE = gql`
  mutation($flag: Boolean!, $id: ID!) {
    updateCirclePermission(id: $id, useEmail: $flag) {
      id
      useEmail
    }
  }
`;

export const UPDATE_PUSH_PERMISSION_FOR_CIRCLE = gql`
  mutation($flag: Boolean!, $id: ID!) {
    updateCirclePermission(id: $id, usePush: $flag) {
      id
      usePush
    }
  }
`;
export const UPDATE_SMS_PERMISSION_FOR_CIRCLE = gql`
  mutation($flag: Boolean!, $id: ID!) {
    updateCirclePermission(id: $id, useSMS: $flag) {
      id
      useSMS
    }
  }
`;
export const UPDATE_ALLOW_MARKETING_EMAIL = gql`
  mutation($id: ID!, $flag: Boolean!) {
    updateUserPref(id: $id, maySendMarketingEmail: $flag) {
      id
      maySendMarketingEmail
    }
  }
`;

export const DELETE_CIRCLE_PERMISSION = gql`
  mutation($id: ID!) {
    deleteCirclePermission(id: $id) {
      id
    }
  }
`;

export const ADD_REVISION_TO_AMENDMENT = gql`
  mutation($revision: ID!, $amendment: ID!, $title: String!) {
    updateAmendment(revisionId: $revision, id: $amendment, title: $title) {
      id
    }
  }
`;
