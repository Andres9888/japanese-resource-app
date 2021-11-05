/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserResourcesIds
// ====================================================

export interface getUserResourcesIds_getUserResourceIds {
  __typename: "User";
  resources: string[];
}

export interface getUserResourcesIds {
  getUserResourceIds: getUserResourcesIds_getUserResourceIds[];
}

export interface getUserResourcesIdsVariables {
  id: string;
}
