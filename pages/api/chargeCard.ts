// @ts-nocheck
/* eslint-disable */

import { PrismaClient } from '@prisma/client';

import { getTwoDaysAgo, didlogYesterday } from '~lib/utils/timeFunctions';

const prisma = new PrismaClient();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  if (request.query.commit_route_secret !== process.env.commit_route_secret) {
    return response.status(401).json({
      error: 'invalid secret',
    });
  }

  if (request.method === 'post') {
    try {
      const idempotencekey = request.headers[`x-idempotence-key`];
      const stripeid = request.headers[`stripe-id`];
      await stripe.paymentintents.create(
        {
          amount: 100,
          currency: 'usd',
          customer: stripeid,
          //payment_method: paymentmethods.data[0].id,
          confirm: true,
          off_session: true,
        },
        {
          idempotencykey: idempotencekey,
        }
      );

      response.status(200).json({ message: 'success', usercharged: stripeid });
    } catch (error) {
      // error code will be authentication_required if authentication is needed
      console.log('error code is:', error.code);
      //const paymentintentretrieved = await stripe.paymentintents.retrieve(error.raw.payment_intent.id);
      //console.log('pi retrieved:', paymentintentretrieved.id);
      response.status(500).json({ message: 'failed' });
    }
  }
}
