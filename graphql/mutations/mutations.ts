import gql from 'graphql-tag';

export const INCREMENT_COUNT = gql`
  mutation incrementCount($id: ID!, $viewer: ID!, $resource: String!) {
    increment(id: $id, viewer: $viewer, resource: $resource) {
      acknowledged
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
