//@ts-nocheck

import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { initializeApollo } from '~lib/apolloClient'
import { Viewer } from '~types/globalTypes'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Card, Layout, Typography } from 'antd'
import 'antd/dist/antd.css'

const { Content } = Layout
const { Text, Title } = Typography

interface Props {
  setViewer: (viewer: Viewer) => void
}

const AUTH_URL = gql`
  query AuthUrl {
    authUrl
  }
`

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
`

const LogInButton = styled.button`
  font-size: 48px;
  border: 1px gray solid;
`

const LogIn = ({ setViewer }: Props) => {
  const client = initializeApollo()
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn)
      }
    },
  })
  const logInRef = useRef(logIn)

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      })
    }
  }, [])

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      })
      window.location.href = data.authUrl
    } catch {}
  }

  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to Japanese Resource App!
          </Title>
          <Text>
            Sign in with Google to start voting and keeping track of liked
            resources
          </Text>
        </div>
        <button
          onClick={handleAuthorize}
          className="log-in-card__google-button"
        >
          <img
            src="/static/images/google_logo.jpg"
            alt="Google Logo"
            className="log-in-card__google-button-logo"
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
  )
}

export default LogIn
