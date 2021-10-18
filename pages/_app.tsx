/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import '~styles/main.scss';

import { useState } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';

import { useApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  didRequest: false,
};

export default function App({ Component, pageProps }) {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    // @ts-ignore
    <ApolloProvider client={apolloClient}>
      <Head>
        <link href="/favicon.ico" rel="icon" />
        <link
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"
          rel="stylesheet"
        />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} setViewer={setViewer} viewer={viewer} />
    </ApolloProvider>
  );
}
