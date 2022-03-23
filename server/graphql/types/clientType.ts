// scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Listing {
    id: ID!
    image: String!
    url: String!
    title: String!
    description: String!
    tags: [String!]!
    count: Int!
  }

  type User {
    id: ID
    token: String
    avatar: String
    resources: [String!]!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean

    didRequest: Boolean!
    name: String
  }

  input LogInInput {
    code: String!
  }
  input resourceInput {
    resource: String!
  }
  type CountResult {
    acknowledged: Boolean
  }
  type Acknowledged {
    acknowledged: Boolean
  }
  type Query {
    listings: [Listing!]!
    authUrl: String!
    checkUserVote(id: ID!, resource: String!): [User!]!
    getUserResourceIds(id: ID!): [User!]!
  }
  type Mutation {
    increment(id: ID!, viewer: ID!, resource: String!): CountResult
    setCommitment(viewerId: ID!, isCommited: Boolean!): Acknowledged
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;
