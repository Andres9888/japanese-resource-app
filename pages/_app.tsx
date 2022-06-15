/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// @ts-nocheck

import '~styles/main.scss';
import { useState, useEffect, useRef } from 'react';

import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import { AppType } from 'next/dist/shared/lib/utils';
import { Provider } from 'react-redux';

import { AppRouter } from './api/trpc/[trpc]';

import LoadingCookieTemplatePage from '~app/components/LoadingCookieTemplatePage';
import { store } from '~app/store';
import { LogIn as LogInData } from '~graphql/mutations/__generated__/LogIn';
import { LOG_IN } from '~graphql/mutations/mutations';
import Footer from '~layouts/default/Footer';
import Nav from '~layouts/default/Nav';
import { useApollo, initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';

const LogRocket = require('logrocket');
const setupLogRocketReact = require('logrocket-react');

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  isCommited: null,
  didRequest: false,
  name: null,
};

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [searchTerm, setSearchTerm] = useState('');
  const [logIn, { error }] = useMutation<LogInData>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        LogRocket.identify(data.logIn.id, { ...data.logIn });

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
    if (typeof window !== 'undefined') {
      LogRocket.init('jwy8km/japaneselist');
      // plugins should also only be initialized when in the browser
      setupLogRocketReact(LogRocket);
    }
    logInReference.current();
  }, []);

  if (!viewer.didRequest && !error) return <LoadingCookieTemplatePage />;

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Nav error={error} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setViewer={setViewer} viewer={viewer} />
        <Component {...pageProps} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setViewer={setViewer} viewer={viewer} />
        <Footer />
      </Provider>
    </ApolloProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : 'http://localhost:3000/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(App);
