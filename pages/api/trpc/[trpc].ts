import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

const prisma = new PrismaClient();
export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('findUsers', {
    resolve() {
      return prisma.user.findMany();
    },
  })
  .query('findUserVotedResourceIds', {
    input: z.object({
      id: z.string().nonempty(),
    }),
    resolve({ input }) {
      return prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          resources: true,
        },
      });
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
