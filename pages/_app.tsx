//@ts-nocheck
import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '~lib/apolloClient';
import '~styles/main.scss';
import { Viewer } from '~@types/globalTypes';
import Head from 'next/head';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

export default function App({ Component, pageProps }) {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"></script>
        <script>
          {kofiWidgetOverlay.draw('andres9888', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#1890ff',
            'floating-chat.donateButton.text-color': '#fff',
          })}
        </script>
      </Head>
      <Component {...pageProps} viewer={viewer} setViewer={setViewer} />
    </ApolloProvider>
  );
}
