import React from 'react';

import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';

import Home from '../../pages/index';

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
