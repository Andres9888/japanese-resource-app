//@ts-nocheck


import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import { initializeApollo } from '~lib/apolloClient'
import { Viewer } from '~types/globalTypes'
import gql from 'graphql-tag'
import {useMutation } from '@apollo/react-hooks'

interface Props{
  setViewer: (viewer: Viewer) => void
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
  font-size: 48px;
  border: 1px gray solid;
`



 const LogIn = ({setViewer}: Props) => {
  const client = initializeApollo()
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError }
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
      }
    }
  });
  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      logInRef.current({
        variables: {
          input: { code }
        }
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL
      });
      window.location.href = data.authUrl;
    } catch {
    }
  };


  return (<LogInButton onClick={handleAuthorize}>login button</LogInButton>)
}

export default LogIn

