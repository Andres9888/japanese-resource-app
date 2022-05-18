import { PrismaClient, Prisma } from '@prisma/client';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

const prisma = new PrismaClient();
const userVotedResourceIds = Prisma.validator<Prisma.UserSelect>()({
  votedResourceIds: true,
});

export const appRouter = trpc
  .router()
  .query('findUsers', {
    resolve() {
      return prisma.user.findMany();
    },
  })
  .query('findUserVotedResourceIds', {
    input: z.object({
      id: z.string().nonempty(),
    }),
    async resolve({ input }) {
      const userVotedResourceIdReponse = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: userVotedResourceIds,
      });
      if (!userVotedResourceIdReponse) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No votedResourceIds with userId :'${input.id}'`,
        });
      }
      return userVotedResourceIdReponse;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
