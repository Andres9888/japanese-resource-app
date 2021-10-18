declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const content: DocumentNode;
  export default content;
}

declare module '*.graphql' {
  const content: DocumentNode;
  export default content;
}

declare module '*.qql' {
  const content: any;
  export default content;
}
