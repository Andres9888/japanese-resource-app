import gql from 'graphql-tag';

export const SET_STRIPE_CARD_STATUS = gql`
  mutation setStripeCardStatus($viewerId: ID!) {
    setStripeCardStatus(viewerId: $viewerId) {
      id
      token
      avatar
      hasWallet
      didRequest
      name
      isCommited
    }
  }
`;

export const SET_COMMITMENT_LOG = gql`
  mutation setCommitmentLog($viewerId: ID!, $timeZone: String!) {
    setCommitmentLog(viewerId: $viewerId, timeZone: $timeZone) {
      status
    }
  }
`;

export const SET_COMMITMENT = gql`
  mutation setCommitment($viewerId: ID!, $isCommited: Boolean!, $timeZone: String!) {
    setCommitment(viewerId: $viewerId, isCommited: $isCommited, timeZone: $timeZone) {
      id
      token
      avatar
      hasWallet
      didRequest
      name
      isCommited
    }
  }
`;

export const INCREMENT_COUNT = gql`
  mutation incrementCount($id: ID!, $viewer: ID!, $resource: String!) {
    increment(id: $id, viewer: $viewer, resource: $resource) {
      status
    }
  }
`;

export const LOG_IN = gql`
  mutation LogIn($input: LogInInput) {
    logIn(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
      name
      isCommited
    }
  }
`;
export const LOG_OUT = gql`
  mutation LogOut {
    logOut {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
