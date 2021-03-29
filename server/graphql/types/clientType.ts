//scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client'

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

  type Viewer{
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
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
  type Query {
    listings: [Listing!]!
    authUrl: String!
  }
  type Mutation {
    increment(id: ID!,viewer: ID!, resource: String!): CountResult
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`
