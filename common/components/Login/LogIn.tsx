// @ts-nocheck

import React, { useEffect, useRef } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Card, Layout, Typography, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ErrorBanner } from '~common/components/ErrorBanner';
import { LogIn as LogInData, LogInVariables } from '~graphql/mutations/__generated__/LogIn';
import { LOG_IN } from '~graphql/mutations/mutations';
import { AuthUrl as AuthUrlData } from '~graphql/queries/__generated__/AuthUrl';
import { AUTH_URL } from '~graphql/queries/queries';
import { initializeApollo } from '~lib/apolloClient';
import { displaySuccessNotification, displayErrorMessage } from '~lib/utils';
import { Viewer } from '~types/globalTypes';

import 'antd/dist/antd.css';

const LogRocket = require('logrocket');

const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

const LogIn = ({ setViewer }: Props) => {
  const client = initializeApollo();
  const router = useRouter();
  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: async data => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
        LogRocket.identify(data.logIn.id, { ...data.logIn });
        sessionStorage.setItem('token', data.logIn.token);
        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });
  const logInReference = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInReference.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch {
      displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!");
    }
  };
  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }
  if (logInData && logInData.logIn) {
    router.push('/');
  }
  const logInErrorBannerElement = logInError ? <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" /> : null;

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title className="log-in-card__intro-title" level={3}>
            <span aria-label="wave" role="img">
              👋
            </span>
          </Title>
          <Title className="log-in-card__intro-title" level={3}>
            Log in to Japanese Resource App!
          </Title>
          <Text>Sign in with Google to start voting and keeping track of liked resources</Text>
        </div>
        <button className="log-in-card__google-button" type="button" onClick={handleAuthorize}>
          <Image alt="Google Logo" className="log-in-card__google-button-logo" height={43} src="/static/images/google_logo.jpg" width={43} />
          <span className="log-in-card__google-button-text">Sign in with Google</span>
        </button>
        <Text type="secondary">Note: By signing in, you`&apos;`ll be redirected to the Google consent form to sign in with your Google account.</Text>
      </Card>
    </Content>
  );
};

export default LogIn;
