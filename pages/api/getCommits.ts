import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

// import { connectDatabase } from '~server/database';

const prisma = new PrismaClient();
export default async (req, res) => {
  try {
    const gettwoYesterdayStart = () => {
      return DateTime.now()
        .setZone('utc')
        .minus({ days: 2 })
        .startOf('day')
        .toJSDate();
    };
    const getYesterdayStart = timezone => {
      return DateTime.now()
        .setZone(timezone)
        .minus({ days: 6 })
        .startOf('day')
        .toMillis();
    };
    const getYesterdayEnd = timezone => {
      return DateTime.now()
        .setZone(timezone)
        .minus({ days: 6 })
        .endOf('day')
        .toMillis();
    };
    const getSeconds = isoTime => {
      return DateTime.fromJSDate(isoTime).toMillis();
    };
    const commits = await prisma.user.findMany({
      where: {
        committed: true,
        // dateCommitted: {
        // gte: gettwoYesterdayStart(),
        // },
      },
    });

    const userId = () => {
      return commits.filter(user => {
        const filteredCommits = user.committedLog.filter(log => {
          if (getSeconds(log.dateCommitted) >= getYesterdayStart(user.timezone) && getSeconds(log.dateCommitted) <= getYesterdayEnd(user.timezone)) {
            return true;
          }
          return false;
        });

        if (filteredCommits.length === 0) {
          return { userId: user.id, commits: filteredCommits.length, stripeId: user.stripeId };
        }
        return false;
      });
    };

    const userIds = userId();
    console.log(userId());
    // Search for documents in the current collection.

    // const agg = [
    //   {
    //     $match: {
    //       committed: true,
    //     },
    //   },
    //   {
    //     $match: {
    //       dateCommitted: {
    //         $gte: new Date('Tue, 29 Dec 2020 00:00:00 GMT'),
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       stripeId: 1,
    //       timezone: 1,
    //       committedLog: {
    //         $filter: {
    //           input: '$committedLog',
    //           as: 'index',
    //           cond: {
    //             $and: [
    //               { $gte: ['$$index.dateCommitted', getYesterdayStart('$$index.timezone')] },
    //               { $lte: ['$$index.dateCommitted', getYesterdayEnd('$$index.timezone')] },
    //             ],
    //           },
    //         },
    //       },
    //     },
    //   },
    // ];

    // const commits = await database.users.aggregate(agg).toArray();

    res.status(200).json({ userIds });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
