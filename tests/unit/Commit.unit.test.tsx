// @ts-nocheck
/* eslint-disable */

import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import { useApollo, initializeApollo } from '~lib/apolloClient';
import Commit from '~pages/commit';

import '@testing-library/jest-dom';

import { Viewer } from '~types/globalTypes';
// create unit test for Commit component
// include apollo mock client in this component

afterEach(cleanup);
describe('Commit component', () => {
  const apolloClient = initializeApollo();

  const viewer: Viewer = {
    id: '1',
    isCommited: false,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false,
    name: null,
  };

  const setViewer = jest.fn();
  it('Should Render Yes Text when a viewer is not commited', () => {
    const { getByText } = render(
      <ApolloProvider client={apolloClient}>
        <Commit setViewer={setViewer} viewer={viewer} />
      </ApolloProvider>
    );
    expect(getByText(/Yes/i)).toBeInTheDocument();
  });

  // it('should render the commit button', () => {
  //   const { getByText } = render(<Commit setViewer={setViewer} viewer={viewer} />);
  //   expect(getByText('Commit')).toBeInTheDocument();
  // });
  // it('should render the commit button if the user is commited', () => {
  //   const { getByText } = render(<Commit setViewer={setViewer} viewer={{ ...viewer, isCommited: true }} />);
  //   expect(getByText('Remove Commitment')).toBeInTheDocument();
  // });
  // it('should render the commit button if the user is not commited', () => {
  //   const { getByText } = render(<Commit setViewer={setViewer} viewer={{ ...viewer, isCommited: false }} />);
  //   expect(getByText('Commit')).toBeInTheDocument();
  // });
  // it('should set the commited value to true if the user clicks the commit button', () => {
  //   const { getByText } = render(<Commit setViewer={setViewer} viewer={viewer} />);
  //   getByText('Commit').click();
  //   expect(viewer.isCommited).toBe(true);
  // });
  // it('should set the commited value to false if the user clicks the remove commitment button', () => {
  //   const { getByText } = render(<Commit setViewer={setViewer} viewer={{ ...viewer, isCommited: true }} />);
  //   getByText('Remove Commitment').click();
  //   expect(viewer.isCommited).toBe(false);
  // });
});
