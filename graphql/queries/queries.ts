import gql from 'graphql-tag';

export const RESOURCES = gql`
  query getResources {
    listings {
      id
      title
      description
      image
      url
      tags
      count
    }
  }
`;
export const CHECK_USER_VOTE = gql`
  query checkUserVoteID($id: ID!, $resource: String!) {
    checkUserVote(id: $id, resource: $resource) {
      resources
    }
  }
`;

export const GET_USER_RESOURCES_IDS = gql`
  query getUserResourcesIds($id: ID!) {
    getUserResourceIds(id: $id) {
      resources
    }
  }
`;
