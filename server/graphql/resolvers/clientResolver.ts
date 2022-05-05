/* eslint-disable import/prefer-default-export */
// @ts-nocheck
import crypto from 'crypto';

import { PrismaClient, Resource, User } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { serialize } from 'cookie';

import { incrementCountVariables } from '~graphql/mutations/__generated__/incrementCount';
import { setCommitmentVariables } from '~graphql/mutations/__generated__/setCommitment';
import { setCommitmentLogVariables } from '~graphql/mutations/__generated__/setCommitmentLog';
import { Google } from '~lib/api';
import { Viewer } from '~types/globalTypes';

const prisma = new PrismaClient();

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV !== 'development',
  maxAge: 365 * 24 * 60 * 60 * 1000,
};

// const authorize = async (database: Database, req: Request): Promise<User | null> => {
//   const token = req.get('X-CSRF-TOKEN');
//   console.log('x-csrf-token', token);

//   return await database.users.findOne({
//     _id: req.cookies.viewer,
//     token,
//   });
// };

const SET_COOKIE = 'Set-Cookie';

const logInViaGoogle = async (code: string, token: string, res) => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error('Google login error');
  }

  // Name/Photo/Email Lists
  const userNamesList = user.names && user.names.length > 0 ? user.names : null;
  const userPhotosList = user.photos && user.photos.length > 0 ? user.photos : null;
  const userEmailsList = user.emailAddresses && user.emailAddresses.length > 0 ? user.emailAddresses : null;

  // User Display Name
  const userName = userNamesList ? userNamesList[0].displayName : null;

  // User Id
  const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source ? userNamesList[0].metadata.source.id : null;

  // User Avatar
  const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  // User Email
  const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error('Google login error');
  }
  try {
    let viewer;
    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (userExist) {
      const updateResponse = await prisma.user.update({
        data: {
          name: userName,
          avatar: userAvatar,
          contact: userEmail,
          token,
        },
        where: {
          id: userId,
        },
      });
      viewer = updateResponse;
    } else {
      const createResponse = await prisma.user.create({
        data: {
          id: userId,
          token,
          name: userName,
          avatar: userAvatar,
          contact: userEmail,
        },
      });
      viewer = createResponse;
    }

    res.setHeader(SET_COOKIE, serialize('viewer', userId, cookieOptions));

    return viewer;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(`Failed to Login : ${error}`);
  }
};
const logInViaCookie = async (token: string, req: Request, res: Response): Promise<User | undefined> => {
  try {
    let viewer;
    const userExist = await prisma.user.findUnique({
      where: {
        id: req.cookies.viewer || '',
      },
    });

    if (userExist) {
      const updateResponse = await prisma.user.update({
        data: {
          token,
        },
        where: {
          id: req.cookies.viewer,
        },
      });
      viewer = updateResponse;
    }

    if (!viewer) {
      res.setHeader(
        SET_COOKIE,
        serialize('viewer', '', {
          maxAge: -1,
        })
      );
    }

    return viewer;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(`Failed to Login with Cookies: ${error}`);
  }
};
export const resolvers = {
  Query: {
    resources: async (): Promise<Resource[]> => {
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
        Sentry.captureException(error);
        throw new Error(`Failed to query resources: ${error}`);
      }
    },
    getUserResourceIds: async (_root: undefined, { id }) => {
      try {
        return await prisma.user.findMany({
          where: {
            id,
          },
          select: {
            resources: true,
          },
        });
      } catch (error) {
        throw new Error(`Failed to query user resources Ids: ${error}`);
      }
    },
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to get authUrl ${error}`);
      }
    },
  },

  Mutation: {
    increment: async (_root: undefined, { id, viewer, resource }: incrementCountVariables) => {
      try {
        const incrementResource = prisma.resource.update({
          where: { id },
          data: { count: { increment: 1 } },
        });

        const addResourceToUser = prisma.resourceId.create({
          data: { userId: viewer, resourceId: resource },
        });
        await prisma.$transaction([incrementResource, addResourceToUser]);

        return { status: true };
      } catch (error) {
        throw new Error(`Failed to Vote : ${error}`);
      }
    },
    setCommitment: async (_root: undefined, { viewerId, isCommited, timeZone }: setCommitmentVariables) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to setCommitment : ${error}`);
      }
    },
    setCommitmentLog: async (_root: undefined, { viewerId, timeZone }: setCommitmentLogVariables) => {
      try {
        const updateResponse = await prisma.user.update({
          where: {
            id: viewerId,
          },
          data: {
            committedLog: {
              push: { timezone: timeZone, dateLogged: new Date() },
            },
          },
        });
        if (!updateResponse) {
          throw new Error('Viewer could not be updated');
        }

        return { status: true };
      } catch (error) {
        throw new Error(`Failed to setCommitment : ${error}`);
      }
    },
    setStripeCardStatus: async (_root: undefined, { viewerId }) => {
      try {
        const updateReponse = await prisma.user.update({
          data: {
            stripeHasCard: true,
          },
          where: {
            id: viewerId,
          },
          select: {
            id: true,
            token: true,
            avatar: true,
            name: true,
            stripeId: true,
            stripeHasCard: true,
            committed: true,
          },
        });

        if (!updateReponse) {
          throw new Error('viewer could not be updated');
        }

        const viewer = updateReponse;

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
      } catch (error) {
        throw new Error(`Failed to setStripeCardStatus : ${error}`);
      }
    },
    logIn: async (_root: undefined, { input }, { req, res }) => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString('hex');

        const viewer: User | undefined = code ? await logInViaGoogle(code, token, res) : await logInViaCookie(token, req, res);

        if (!viewer) {
          return { didRequest: true };
        }

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
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (_root: undefined, _arguments: Record<string, never>, { res }: { res: Response }): Viewer => {
      try {
        res.setHeader(
          SET_COOKIE,
          serialize('viewer', '', {
            maxAge: -1,
          })
        );

        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },
  },

  Viewer: {
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId && viewer.stripeHasCard ? true : undefined;
    },
  },
};
