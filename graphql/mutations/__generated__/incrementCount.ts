/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: incrementCount
// ====================================================

export interface incrementCount_increment {
  __typename: "ConfirmStatus";
  status: boolean;
}

export interface incrementCount {
  increment: incrementCount_increment;
}

export interface incrementCountVariables {
  id: string;
  viewer: string;
  resource: string;
}
