import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

export default async (_req, res) => {
  try {
    const getTwoDaysAgo = () => {
      return DateTime.now()
        .setZone('utc')
        .minus({ days: 2 })
        .startOf('day')
        .toJSDate();
    };
    const getYesterdayStart = timezone => {
      return DateTime.now()
        .setZone(timezone)
        .minus({ days: 1 })
        .startOf('day')
        .toMillis();
    };
    const getYesterdayEnd = timezone => {
      return DateTime.now()
        .setZone(timezone)
        .minus({ days: 1 })
        .endOf('day')
        .toMillis();
    };
    const convertToMilliseconds = isoTime => {
      return DateTime.fromJSDate(isoTime).toMillis();
    };

    const didlogYesterday = (log, user) => {
      if (
        convertToMilliseconds(log.dateLogged) >= getYesterdayStart(user.timezone) &&
        convertToMilliseconds(log.dateLogged) <= getYesterdayEnd(user.timezone)
      ) {
        return true;
      }
      return false;
    };

    const commits = await prisma.user.findMany({
      where: {
        committed: true,
        //   dateCommitted: {
        //     lte: getTwoDaysAgo(),
        //   },
        // },
      },
    });

    const getIdsToCharge = () => {
      return commits.filter(user => {
        const yesterdaysLogs = user.committedLog.filter(log => didlogYesterday(log, user));

        return yesterdaysLogs.length === 0;
      });
    };

    const idsToCharge = getIdsToCharge();

    res.status(200).json({ idsToCharge });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
