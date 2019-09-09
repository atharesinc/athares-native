import { split, concat, ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { RetryLink } from "apollo-link-retry";
import { AsyncStorage } from 'react-native';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import getEnvVars from '../env';
const { GQL_HTTP_URL, GQL_WS_URL } = getEnvVars();

// Create an http link:
const httpLink = new HttpLink({
  uri: GQL_HTTP_URL,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: GQL_WS_URL,
  options: {
    reconnect: true,
  },
});

// create cache
const cache = new InMemoryCache();

let token;

const withToken = setContext(async request => {
  if (!token) {
    token = await AsyncStorage.getItem('ATHARES_TOKEN');
  }
  return {
    headers: {
      authorization: 'Bearer ' + token,
    },
  };
});

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    // remove cached token on 401 from the server
    token = undefined;
  }
});

const authFlowLink = withToken.concat(resetToken);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  concat(authFlowLink, httpLink),
);

export { link, cache };
