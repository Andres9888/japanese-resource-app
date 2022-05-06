import { PrismaClient } from '@prisma/client';

import { getTwoDaysAgo, didlogYesterday } from '~lib/utils/timeFunctions';

const prisma = new PrismaClient();

export default async (request, response) => {
  if (request.query.COMMIT_ROUTE_SECRET !== process.env.COMMIT_ROUTE_SECRET) {
    return response.status(401).json({
      error: 'Invalid secret',
    });
  }

  try {
    const commits = await prisma.user.findMany({
      where: {
        committed: true,
        dateCommitted: {
          lte: getTwoDaysAgo(),
        },
      },
      include: { committedLog: true },
    });

    const getIdsToCharge = () => {
      return commits.filter(user => {
        const yesterdaysLogs = user.committedLog.filter(log => didlogYesterday(log, user));

        return yesterdaysLogs.length === 0;
      });
    };

    const idsToCharge = getIdsToCharge();

    return response.status(200).send({ idsToCharge });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
