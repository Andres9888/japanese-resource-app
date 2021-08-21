/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkUserVoteID
// ====================================================

export interface checkUserVoteID_checkUserVote {
  __typename: "User";
  resources: string[];
}

export interface checkUserVoteID {
  checkUserVote: checkUserVoteID_checkUserVote[];
}

export interface checkUserVoteIDVariables {
  id: string;
  resource: string;
}
