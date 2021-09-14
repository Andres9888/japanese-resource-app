import { render } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/index';
import { MockedProvider } from '@apollo/react-testing';

const { describe, it, expect } = global;

describe('Testing Home Page', () => {
  describe('search input', () => {
    render(
      <MockedProvider mocks={[]}>
        <Home />
      </MockedProvider>
    );
  });
});
