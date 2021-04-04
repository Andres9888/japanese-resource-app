// @ts-nocheck
import { ObjectId } from 'mongodb'
import { connectDatabase } from '~server/database'
import { Google } from '~lib/api'
import crypto from 'crypto'
import { Request, Response } from 'express'

// const cookieOptions = {
//   httpOnly: true,
//   sameSite: true,
//   signed: true,
//   secure: process.env.NODE_ENV === 'development' ? false : true,
// }

const getDb = async () => {
  const db = await connectDatabase()
  return db
}

const logInViaGoogle = async (code: string, token: string, res: Response) => {
  const { user } = await Google.logIn(code)

  if (!user) {
    throw new Error('Google login error')
  }

  // Name/Photo/Email Lists
  const userNamesList = user.names && user.names.length ? user.names : null
  const userPhotosList = user.photos && user.photos.length ? user.photos : null
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null

  // User Display Name
  const userName = userNamesList ? userNamesList[0].displayName : null

  // User Id
  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null

  // User Avatar
  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null

  // User Email
  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error('Google login error')
  }
  const db = await getDb()
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
  )

  let viewer = updateRes.value

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      resources: [],
    })

    viewer = insertResult.ops[0]
  }

  // res.cookie('viewer', userId, {
  //   ...cookieOptions,
  //   maxAge: 365 * 24 * 60 * 60 * 1000,
  // })

  return viewer
}

// const logInViaCookie = async (token: string, req: Request, res: Response) => {
//   const db = await getDb()
//   const updateRes = await db.users.findOneAndUpdate(
//     { _id: req.signedCookies.viewer },
//     { $set: { token } },
//     { returnOriginal: false }
//   )
//   let viewer = updateRes.value
//   if (!viewer) {
//     res.clearCookie('viewer', cookieOptions)
//   }
//   return viewer
// }

export const resolvers = {
  // Query
  Query: {
    listings: async (_root: undefined, _args: {}) => {
      const db = await getDb()
      return await db.listings.find({}).toArray()
    },
    checkUserVote: async (_root: undefined, { id, resource }) => {
      const db = await getDb()
      return await db.users.find({ _id: id, resources: resource }).toArray()
    },
    authUrl: (): string => {
      try {
        return Google.authUrl
      } catch {
        throw new Error('Failed to Query google auth url')
      }
    },
  },
  // Mutation
  Mutation: {
    increment: async (
      _root: undefined,
      { id, viewer, resource }: { id: string }
    ) => {
      const db = await getDb()
      return (
        await db.listings.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { count: 1 } }
        ),
        db.users.updateOne({ _id: viewer }, { $push: { resources: resource } })
      )
    },
    // setUserVote: async (_root: undefined, { viewer, resource }) => {
    //   const db = await getDb()
    //   return await db.users.updateOne(
    //     { _id : viewer},
    //     { $push: { resources: resource} }
    // )
    // },
    logIn: async (_root: undefined, { input }) => {
      try {
        const code = input ? input.code : null
        const token = crypto.randomBytes(16).toString('hex')

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token)
          : undefined

        if (!viewer) {
          return { didRequest: true }
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        }
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`)
      }
    },
    logOut: (): Viewer => {
      try {
        return { didRequest: true }
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`)
      }
    },
  },
  Listing: {
    id: (listing): string => listing._id.toString(),
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined
    },
  },
}
