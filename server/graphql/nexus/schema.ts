// api/schema.ts
import { join } from 'path';

import { makeSchema } from 'nexus';

import * as types from './types';

const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), '../nexus-typegen.ts'),
    schema: join(process.cwd(), '../schema.graphql'),
  },
});
