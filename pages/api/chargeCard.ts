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
      const { id: idempotenceKey } = request.body;

      for (let index = 0; index < usersToCharge.length; index++) {
        const stripeId = userStripeIdsToCharge[index];
        // const paymentMethods = await stripe.paymentMethods.list({
        //   customer: stripeId,
        //   type: 'card',
        // });

        await stripe.paymentIntents.create(
          {
            amount: 100,
            currency: 'usd',
            customer: stripeId,
            //payment_method: paymentMethods.data[0].id,
            confirm: true,
            off_session: true,
          },
          {
            idempotencyKey: idempotenceKey,
          }
        );
      }

      response.status(200).json({ message: 'success', usersCharged: userStripeIdsToCharge, UsersChargedInfo: usersToCharge });
    } catch (error) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is:', error.code);
      //const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(error.raw.payment_intent.id);
      //console.log('PI retrieved:', paymentIntentRetrieved.id);
      response.status(500).json({ message: 'failed' });
    }
  }
}
