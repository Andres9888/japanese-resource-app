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

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
  }

  input LogInInput {
    code: String!
  }
  type CountResult {
    acknowledged: Boolean
  }
  type Query {
    listings: [Listing!]!
    authUrl: String!
    user: String!
  }

  type Mutation {
    increment(id: ID!): CountResult
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`
