import gql from "graphql-tag";

export const SUB_TO_MESSAGES_BY_CHANNEL_ID = gql`
  subscription subToMessages($id: ID!) {
    Message(filter: { mutation_in: CREATED, node: { channel: { id: $id } } }) {
      node {
        id
        text
        createdAt
        file
        fileName
        user {
          id
          icon
          firstName
          lastName
        }
      }
    }
  }
`;

export const SUB_TO_DMS_BY_USER = gql`
  subscription subtoDMs($ids: [ID!]!) {
    Message(
      filter: {
        mutation_in: CREATED
        node: { channel: { AND: { id_in: $ids, channelType: "dm" } } }
      }
    ) {
      node {
        id
        user {
          id
          firstName
        }
        channel {
          id
        }
      }
    }
  }
`;

export const SUB_TO_ALL_CIRCLES_CHANNELS = gql`
  subscription subToCallCirclesChannel($ids: [ID!]!) {
    Message(
      filter: {
        mutation_in: CREATED
        node: { channel: { AND: { id_in: $ids, channelType: "group" } } }
      }
    ) {
      node {
        id
        user {
          id
        }
        channel {
          id
        }
      }
    }
  }
`;

export const SUB_TO_CIRCLES_AMENDMENTS = gql`
  subscription($id: ID!) {
    Amendment(
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
        node: { circle: { id: $id } }
      }
    ) {
      previousValues {
        id
      }
      mutation
      node {
        id
        title
        text
        revision {
          passed
          id
        }
        createdAt
        updatedAt
      }
    }
  }
`;
