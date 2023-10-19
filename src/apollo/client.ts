import fetch from 'cross-fetch';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';
// import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, path }) =>
      console.log(
        `[Graphql error]: Message: ${message}, Extensions: code(${
          extensions.code
        }) stacktrace(${(extensions.stacktrace as Array<string>).join(
          '\n'
        )}), Path: ${path}`
      )
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const retryLink = new RetryLink();

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);

//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   new GraphQLWsLink(
//     createClient({
//       url: 'ws://localhost:4000/graphql',
//     })
//   ),
//   new HttpLink({ uri: 'http://localhost:4000/graphql', fetch })
// );
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql', fetch });

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: from([errorLink, retryLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
});

export default client;
