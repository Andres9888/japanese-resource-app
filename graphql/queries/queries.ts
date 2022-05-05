import gql from 'graphql-tag';

export const RESOURCES = gql`
  query getResources {
    resources {
      id
      title
      description
      image
      url
      tags {
        name
      }
      count
    }
  }
`;

export const GET_USER_RESOURCES_IDS = gql`
  query getUserResourcesIds($id: ID!) {
    getUserResourceIds(id: $id) {
      resources {
        resourceId
      }
    }
  }
`;

export const AUTH_URL = gql`
  query AuthUrl {
    authUrl
  }
`;
