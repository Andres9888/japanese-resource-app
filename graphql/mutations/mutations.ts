import gql from 'graphql-tag';

export const INCREMENT_COUNT = gql`
  mutation incrementCount($id: ID!, $viewer: ID!, $resource: String!) {
    increment(id: $id, viewer: $viewer, resource: $resource) {
      acknowledged
    }
  }
`;
