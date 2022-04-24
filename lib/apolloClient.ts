// @ts-nocheck
/* eslint-disable */

import { useMemo } from 'react';

import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from 'apollo-link';

const { HttpLink } = require('@apollo/client/link/http');

let apolloClient: ApolloClient<NormalizedCacheObject>;

const link = new HttpLink({ uri: '/api/graphql' });

const thirdPartyLink = new HttpLink({
  uri: 'https://kitsu.io/api/graphql',
  // other link options...
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-CSRF-TOKEN': sessionStorage.getItem('token') || '',
    },
  });

  return forward(operation);
});

function createIsomorphicLink() {
  if (typeof window === 'undefined') {
    // server
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');
    return new SchemaLink({ schema });
  }
  // client

  return authMiddleware.concat(link);
}

// ApolloLink.split(
//   operation => operation.getContext().clientName === 'third-party',
//   // the string "third-party" can be anything you want,
//   // we will use it in a bit
//   thirdPartyLink, // <= apollo will send to this if clientName is "third-party"
//   authMiddleware.concat(createIsomorphicLink()) // <= otherwise will send to this
// ),

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',

    link: createIsomorphicLink(),
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
