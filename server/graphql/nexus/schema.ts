// api/schema.ts
import { join } from 'path';

import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';

import * as types from './types';

export const schema = makeSchema({
  types,
  plugins: [nexusPrisma()],
  outputs: {
    typegen: join(process.cwd(), 'nexus-generated/nexus-typegen.ts'),
    schema: join(process.cwd(), 'nexus-generated/schema.graphql'),
  },
});
