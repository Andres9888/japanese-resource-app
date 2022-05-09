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

  if (request.method === 'POST') {
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

      for (const stripeId of userStripeIdsToCharge) {
        const paymentMethods = await stripe.paymentMethods.list({
          customer: stripeId,
          type: 'card',
        });

        const paymentIntent = await stripe.paymentIntents.create({
          amount: 100,
          currency: 'usd',
          customer: stripeId,
          payment_method: paymentMethods.data[0].id,
          confirm: true,
          off_session: true,
        }, {
          idempotencyKey: "random-key",
        });
      }

      response.status(200).json({ message: 'success', usersCharged: userStripeIdsToCharge, UsersChargedInfo: usersToCharge });
    } catch (error) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is:', error.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(error.raw.payment_intent.id);
      console.log('PI retrieved:', paymentIntentRetrieved.id);
    }
  }
}

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }
//   return await fn(req, res);
// };

//module.exports = allowCors(handler);
