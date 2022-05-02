/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setStripeCardStatus
// ====================================================

export interface setStripeCardStatus_setStripeCardStatus {
  __typename: "Viewer";
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
  name: string | null;
  isCommited: boolean | null;
}

export interface setStripeCardStatus {
  setStripeCardStatus: setStripeCardStatus_setStripeCardStatus;
}

export interface setStripeCardStatusVariables {
  viewerId: string;
}
