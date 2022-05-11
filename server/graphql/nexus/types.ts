import { PrismaClient } from '@prisma/client';
import { mutationType, queryType, objectType, idArg, nonNull, stringArg, booleanArg, arg, inputObjectType } from 'nexus';

const prisma = new PrismaClient();

export const ConfirmStatus = objectType({
  name: 'ConfirmStatus',
  definition(t) {
    t.nonNull.boolean('status');
  },
});
export const Mutation = mutationType({
  definition(t) {
    t.nonNull.field('increment', {
      type: ConfirmStatus,
      args: {
        id: nonNull(idArg()),
        viewer: nonNull(idArg()),
        resource: nonNull(stringArg()),
      },
    });
    t.nonNull.field('setCommitment', {
      type: Viewer,
      args: {
        viewerId: nonNull(idArg()),
        isCommited: nonNull(booleanArg()),
        timeZone: nonNull(stringArg()),
      },
    });
    t.nonNull.field('setStripeCardStatus', {
      type: Viewer,
      args: {
        viewerId: nonNull(idArg()),
      },
    });
    t.nonNull.field('setCommitmentLog', {
      type: ConfirmStatus,
      args: {
        viewerId: nonNull(idArg()),
      },
    });
    t.nonNull.field('logIn', {
      type: Viewer,
      args: {
        input: arg({ type: LogInInput }),
      },
    });
    t.nonNull.field('logOut', { type: Viewer });
  },
});
export const Query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('resources', {
      type: Resource,
      resolve: async () => {
        try {
          return await prisma.resource.findMany({
            orderBy: [
              {
                count: 'desc',
              },
            ],
            include: { tags: true },
          });
        } catch (error) {
          // Sentry.captureException(error);
          throw new Error(`Failed to query resources: ${error}`);
        }
      },
    });
    t.nonNull.string('authUrl');
    t.nonNull.list.nonNull.field('getUserResourceIds', {
      type: UserResources,
      args: {
        id: nonNull(idArg()),
      },
    });
  },
});
export const Resource = objectType({
  name: 'Resource',
  definition(t) {
    t.id('id');
    t.string('image');
    t.string('url');
    t.string('title');
    t.string('description');
    t.nonNull.list.nonNull.field('tags', { type: Tags });
    t.int('count');
  },
});
export const ResourceId = objectType({
  name: 'ResourceId',
  definition(t) {
    t.int('id');
    t.string('resourceId');
    t.string('userId');
  },
});
export const Tags = objectType({
  name: 'Tags',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('resourceId');
  },
});
export const UserResources = objectType({
  name: 'UserResources',
  definition(t) {
    t.nonNull.list.nonNull.field('resources', { type: ResourceId });
  },
});
export const Viewer = objectType({
  name: 'Viewer',
  definition(t) {
    t.id('id');
    t.string('token');
    t.string('avatar');
    t.boolean('hasWallet');
    t.nonNull.boolean('didRequest');
    t.string('name');
    t.boolean('isCommited');
  },
});

export const ConnectStripeInput = inputObjectType({
  name: 'ConnectStripeInput',
  definition(t) {
    t.nonNull.string('code');
  },
});
export const LogInInput = inputObjectType({
  name: 'LogInInput',
  definition(t) {
    t.nonNull.string('code');
  },
});
export const resourceInput = inputObjectType({
  name: 'resourceInput',
  definition(t) {
    t.nonNull.string('resource');
  },
});
