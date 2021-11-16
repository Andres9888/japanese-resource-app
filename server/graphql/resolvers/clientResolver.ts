/* eslint-disable import/prefer-default-export */
// @ts-nocheck
import crypto from 'crypto';

import { ObjectId } from 'mongodb';

import { incrementCountVariables } from '~graphql/mutations/__generated__/incrementCount';
import { checkUserVoteIDVariables } from '~graphql/queries/__generated__/checkUserVoteID';
import { Google } from '~lib/api';
import { connectDatabase } from '~server/database';
import { Viewer } from '~types/globalTypes';

const getDb = async () => {
  const db = await connectDatabase();
  return db;
};

const logInViaGoogle = async (code: string, token: string) => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error('Google login error');
  }

  // Name/Photo/Email Lists
  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;

  // User Display Name
  const userName = userNamesList ? userNamesList[0].displayName : null;

  // User Id
  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  // User Avatar
  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  // User Email
  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error('Google login error');
  }
  const db = await getDb();
  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
      },
    },
    { returnOriginal: false }
  );

  let viewer = updateRes.value;

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      resources: [],
    });
    // eslint-disable-next-line prefer-destructuring
    viewer = insertResult.ops[0];
  }

  return viewer;
};

export const resolvers = {
  Query: {
    listings: async () => {
      try {
        const db = await getDb();
        return db.listings.find({}).toArray();
      } catch (error) {
        throw new Error(`Failed to query listings: ${error}`);
      }
    },
    getUserResourceIds: async (_root: undefined, { id }) => {
      try {
        const db = await getDb();
        return db.users.find({ _id: id }).toArray();
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
    increment: async (
      _root: undefined,
      { id, viewer, resource }: incrementCountVariables
    ) => {
      try {
        const db = await getDb();
        return (
          await db.listings.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { count: 1 } }
          ),
          db.users.updateOne(
            { _id: viewer },
            { $addToSet: { resources: resource } }
          )
        );
      } catch (error) {
        throw new Error(`Failed to Vote : ${error}`);
      }
    },
    logIn: async (_root: undefined, { input }) => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString('hex');

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token)
          : undefined;

        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (): Viewer => {
      try {
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },
  },
  Listing: {
    id: (listing): string => listing._id.toString(),
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
  },
};
