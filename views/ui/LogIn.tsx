// @ts-nocheck

import React, { useEffect, useRef } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Card, Layout, Typography } from 'antd';
import gql from 'graphql-tag';
import Image from 'next/image';
import styled from 'styled-components';

import { initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

const AUTH_URL = gql`
  query AuthUrl {
    authUrl
  }
`;

const LOG_IN = gql`
  mutation LogIn($input: LogInInput) {
    logIn(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;

const LogInButton = styled.button`
  border: 1px gray solid;
  font-size: 48px;
`;

const LogIn = ({ setViewer }: Props) => {
  const client = initializeApollo();
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
      }
    },
  });
  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInRef.current({
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
    } catch {}
  };

  return (
    <Content className="log-in">
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
          <Text>
            Sign in with Google to start voting and keeping track of liked
            resources
          </Text>
        </div>
        <button
          className="log-in-card__google-button"
          type="button"
          onClick={handleAuthorize}
        >
          <Image
            alt="Google Logo"
            className="log-in-card__google-button-logo"
            height={43}
            width={43}
            src="/static/images/google_logo.jpg"
          />
          <span className="log-in-card__google-button-text">
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  );
};

export default LogIn;
