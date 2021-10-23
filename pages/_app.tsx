/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import '~styles/main.scss';
import { useState, useEffect } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useApollo } from '~lib/apolloClient';
import * as gtag from '~lib/gtag';
import { Viewer } from '~types/globalTypes';

const isProduction = process.env.NODE_ENV === 'production';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  didRequest: false,
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    // @ts-ignore
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Japanese Resources</title>
        <meta
          content="Finding Quality Japanese Resources can be hard to find in the beginning. This site is here to make it easier for you. I currated a list of Japanese study material that I found useful and wanted to share. You can search and filter what type of resources and vote, track, and share the resources you like."
          name="description"
        />
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
