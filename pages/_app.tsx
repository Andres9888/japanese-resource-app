/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// @ts-nocheck
import '~styles/main.scss';
import { useState, useEffect, useRef } from 'react';

import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
// import Script from 'next/script';

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

declare global {
  interface Window {
    sakura: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [searchTerm, setSearchTerm] = useState('');
  const [logIn, { error }] = useMutation<LogInData>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    },

    client: initializeApollo(),
  });

  const logInReference = useRef(logIn);

  useEffect(() => {
    logInReference.current();
  }, []);

  // if (!viewer.didRequest && !error) return <LoadingCookieTemplatePage />;

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        {/* <Script
          src="/static/scripts/sakura.min.js"
          strategy="beforeInteractive"
          onLoad={() => {
            // @ts-ignore

            window.sakura = new Sakura('body', {
              maxSize: 30,
              colors: [
                {
                  gradientColorStart: 'rgba(255, 183, 197, 0.9)',
                  gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
                  gradientColorDegree: 120,
                },
                {
                  gradientColorStart: 'rgba(255,189,189)',
                  gradientColorEnd: 'rgba(227,170,181)',
                  gradientColorDegree: 120,
                },
                {
                  gradientColorStart: 'rgba(212,152,163)',
                  gradientColorEnd: 'rgba(242,185,196)',
                  gradientColorDegree: 120,
                },
              ],
            });
            window.sakura.stop(true);
          }}
        />
        <Script
          src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
          strategy="lazyOnload"
          onLoad={() => {
            // @ts-ignore
            kofiWidgetOverlay.draw('andres9888', {
              type: 'floating-chat',
              'floating-chat.donateButton.text': 'Buy me Coffee',
              'floating-chat.donateButton.background-color': '#1890ff',
              'floating-chat.donateButton.text-color': '#fff',
            });
          }}
        />
        */}
      </Head>

      <Nav error={error} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setViewer={setViewer} viewer={viewer} />

      <Component {...pageProps} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setViewer={setViewer} viewer={viewer} />
    </ApolloProvider>
  );
}
