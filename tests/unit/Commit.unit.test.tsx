// @ts-nocheck
/* eslint-disable */

import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import { useApollo, initializeApollo } from '~lib/apolloClient';
import Commit from '~pages/commit';

import '@testing-library/jest-dom';

import { Viewer } from '~types/globalTypes';

afterEach(cleanup);
describe('Commit component', () => {
  const apolloClient = initializeApollo();

  const setViewer = jest.fn();
  it('Should Render Yes Text when a viewer is not commited', () => {
    const NonCommitedViewer: Viewer = {
      id: '1',
      isCommited: false,
      token: null,
      avatar: null,
      hasWallet: null,
      didRequest: false,
      name: null,
    };
    const { getByText } = render(
      <ApolloProvider client={apolloClient}>
        <Commit setViewer={setViewer} viewer={NonCommitedViewer} />
      </ApolloProvider>
    );
    expect(getByText(/Yes/i)).toBeInTheDocument();
  });
  it('Should Display Remove Commit ');
});
