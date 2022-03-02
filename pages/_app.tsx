/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// @ts-nocheck
import '~styles/main.scss';
import { useState, useEffect, useRef } from 'react';

import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';

import LoadingCookieTemplatePage from '~app/components/LoadingCookieTemplatePage';
import { LogIn as LogInData } from '~graphql/mutations/__generated__/LogIn';
import { LOG_IN } from '~graphql/mutations/mutations';
import Nav from '~layouts/default/Nav';
import { useApollo, initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  didRequest: false,
  name: null,
};

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [searchTerm, setSearchTerm] = useState('');
  const [logIn, { error }] = useMutation<LogInData>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
      }
    },

    client: initializeApollo(),
  });

  const logInReference = useRef(logIn);

  useEffect(() => {
    logInReference.current();
  }, []);
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };
  if (!viewer.didRequest && !error) {
    return <LoadingCookieTemplatePage />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link href="/favicon.ico" rel="icon" />
        <link href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css" rel="stylesheet" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
      </Head>
      <Nav handleSearchChange={handleSearchChange} searchTerm={searchTerm} setViewer={setViewer} viewer={viewer} />
      <Component {...pageProps} searchTerm={searchTerm} setViewer={setViewer} viewer={viewer} />
    </ApolloProvider>
  );
}
