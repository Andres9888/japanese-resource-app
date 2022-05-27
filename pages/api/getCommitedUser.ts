// @ts-nocheck
/* eslint-disable */

import { PrismaClient } from '@prisma/client';

import { getTwoDaysAgo, didlogYesterday } from '~lib/utils/timeFunctions';

const prisma = new PrismaClient();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  if (request.query.COMMIT_ROUTE_SECRET !== process.env.COMMIT_ROUTE_SECRET) {
    return response.status(401).json({
      error: 'Invalid secret',
    });
  }

  if (request.method === 'GET') {
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

      const getUsersToCharge = () => {
        return commits.filter(user => {
          const yesterdaysLogs = user.committedLog.filter(log => didlogYesterday(log, user));

          return yesterdaysLogs.length === 0;
        });
      };

      const usersToCharge = getUsersToCharge();

      const userStripeIdsToCharge = usersToCharge.map(user => user.stripeId);

      response.status(200).json({ message: 'success', usersCharged: userStripeIdsToCharge, UsersChargedInfo: usersToCharge });
    } catch (error) {
      console.log('Error code is:', error);

      response.status(500).json({ message: 'failed' });
    }
  }
}
