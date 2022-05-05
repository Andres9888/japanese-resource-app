// scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Tags {
    id: Int
    name: String
    resourceId: String
  }

  type Resource {
    id: ID
    image: String
    url: String
    title: String
    description: String
    tags: [Tags!]!
    count: Int
  }

  type UserResources {
    resources: [String!]!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
    name: String
    isCommited: Boolean
  }

  type ConfirmStatus {
    status: Boolean!
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
  input ConnectStripeInput {
    code: String!
  }
  type Query {
    resources: [Resource!]!
    authUrl: String!
    getUserResourceIds(id: ID!): [UserResources!]!
  }

  type Mutation {
    increment(id: ID!, viewer: ID!, resource: String!): ConfirmStatus!
    setCommitment(viewerId: ID!, isCommited: Boolean!, timeZone: String!): Viewer!
    setStripeCardStatus(viewerId: ID!): Viewer!
    setCommitmentLog(viewerId: ID!, timeZone: String!): ConfirmStatus!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;
