/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setCommitment
// ====================================================

export interface setCommitment_setCommitment {
  __typename: "Viewer";
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
  name: string | null;
  isCommited: boolean | null;
}

export interface setCommitment {
  setCommitment: setCommitment_setCommitment;
}

export interface setCommitmentVariables {
  viewerId: string;
  isCommited: boolean;
  timeZone: string;
}
