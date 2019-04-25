import { split, concat, ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { RetryLink } from "apollo-link-retry";
import { AsyncStorage } from "react-native";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

let uri =
  process.env.NODE_ENV === "production"
    ? "https://api.graph.cool/simple/v1/cjrucg3gz1obq0149g3vd7nxh"
    : "https://api.graph.cool/simple/v1/cjsnjseb412wz0192x4ivxr1l";
// Create an http link:
const httpLink = new HttpLink({
  uri
});
const wsUri =
  process.env.NODE_ENV === "production"
    ? "wss://subscriptions.us-west-2.graph.cool/v1/cjrucg3gz1obq0149g3vd7nxh"
    : "wss://subscriptions.us-west-2.graph.cool/v1/cjsnjseb412wz0192x4ivxr1l";
// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});

// create cache
const cache = new InMemoryCache();

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // AsyncStorage.getItem("ATHARES_TOKEN").then((res = "") => {
//   //   // add the authorization to the headers
//   //   operation.setContext({
//   //     headers: {
//   //       authorization: "Bearer " + res
//   //     }
//   //   });
//   // });
//   return forward(operation);
// });

let token;

const withToken = setContext(async request => {
  if (!token) {
    token = await AsyncStorage.getItem("ATHARES_TOKEN");
  }
  return {
    headers: {
      authorization: token
    }
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
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  concat(authFlowLink, httpLink)
);

export { link, cache };
