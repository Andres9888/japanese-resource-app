/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getResources
// ====================================================

export interface getResources_resources {
  __typename: "Resource";
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  count: number;
}

export interface getResources {
  resources: getResources_resources[];
}
