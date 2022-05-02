import gql from 'graphql-tag';

export const RESOURCES = gql`
  query getResources {
    resources {
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

export const GET_USER_RESOURCES_IDS = gql`
  query getUserResourcesIds($id: ID!) {
    getUserResourceIds(id: $id) {
      resources
    }
  }
`;

export const AUTH_URL = gql`
  query AuthUrl {
    authUrl
  }
`;
