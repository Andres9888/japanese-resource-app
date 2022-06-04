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
  })
  .mutation('setCommitment', {
    // validate input with Zod
    input: z.object({ viewerId: z.string().nonempty(), isCommited: z.boolean(), timeZone: z.string().nonempty() }),
    async resolve({ input }) {
      // use your ORM of choice
      
        const updateResponse: User = await prisma.user.update({
          where: {
            id: viewerId,
          },
          data: { committed: isCommited, timezone: timeZone, dateCommitted: isCommited ? new Date() : null },
        });

        const viewer = updateResponse;

        return {
          id: viewer.id,
          token: viewer.token,
          avatar: viewer.avatar,
          name: viewer.name,
          walletId: viewer.stripeId,
          stripeHasCard: viewer.stripeHasCard,
          isCommited: viewer.committed,
          didRequest: true,
        };
      } 
        throw new Error(`Failed to setCommitment : ${error}`);
      
    ,
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
