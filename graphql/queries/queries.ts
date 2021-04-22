import gql from 'graphql-tag'

export const LISTINGS = gql`
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
`
export const CHECK_USER_VOTE = gql`
  query checkUserVoteID($id: ID!, $resource: String!) {
    checkUserVote(id: $id, resource: $resource) {
      resources
    }
  }
`

