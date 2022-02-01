import { useMemo } from 'react';

import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ApolloLink } from 'apollo-link';

const { HttpLink } = require('@apollo/client/link/http');

let apolloClient: ApolloClient<NormalizedCacheObject>;

const thirdPartyLink = new HttpLink({
  uri: 'https://kitsu.io/api/graphql',
  // other link options...
});

function createIsomorphicLink() {
  if (typeof window === 'undefined') {
    // server
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');
    return new SchemaLink({ schema });
  }
  // client

  return new HttpLink({ uri: '/api/graphql' });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.split(
      operation => operation.getContext().clientName === 'third-party',
      // the string "third-party" can be anything you want,
      // we will use it in a bit
      thirdPartyLink, // <= apollo will send to this if clientName is "third-party"
      createIsomorphicLink() // <= otherwise will send to this
    ),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
