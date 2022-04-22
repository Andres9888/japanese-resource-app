import { DateTime } from 'luxon';

import { connectDatabase } from '~server/database';

export default async (req, res) => {
  try {
    const database = await connectDatabase();
    const getYesterdayStart = timezone => {
      return DateTime.now()
        .setZone(timezone)
        .minus({ days: 5 })
        .startOf('day')
        .toJSDate();
    };
    const getYesterdayEnd = timezone => {
      return DateTime.now()
        .setZone(timezone)
        .minus({ days: 5 })
        .endOf('day')
        .toJSDate();
    };

    // Search for documents in the current collection.

    const agg = [
      {
        $match: {
          committed: true,
        },
      },
      {
        $match: {
          dateCommitted: {
            $gte: new Date('Tue, 29 Dec 2020 00:00:00 GMT'),
          },
        },
      },
      {
        $project: {
          stripeId: 1,
          timezone: 1,
          committedLog: {
            $filter: {
              input: '$committedLog',
              as: 'index',
              cond: {
                $and: [
                  { $gte: ['$$index.dateCommitted', getYesterdayStart('$$index.timezone')] },
                  { $lte: ['$$index.dateCommitted', getYesterdayEnd('$$index.timezone')] },
                ],
              },
            },
          },
        },
      },
    ];

    const commits = await database.users.aggregate(agg).toArray();

    res.status(200).json({ commits });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
