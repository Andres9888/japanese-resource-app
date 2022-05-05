/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getResources
// ====================================================

export interface getResources_resources_tags {
  __typename: "Tags";
  name: string | null;
}

export interface getResources_resources {
  __typename: "Resource";
  id: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  url: string | null;
  tags: getResources_resources_tags[];
  count: number | null;
}

export interface getResources {
  resources: getResources_resources[];
}
