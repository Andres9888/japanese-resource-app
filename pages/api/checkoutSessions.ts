import { PrismaClient } from '@prisma/client';
import { withSentry } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';
import { assert, string } from 'superstruct';

import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const viewerIdSchema = string();

type UserStripeDetails = {
  contact: string;
  name: string;
  stripeId: string | null;
};

const handler = async (request:NextApiRequest, response:NextApiResponse) => {
  if (request.method === 'POST') {
    try {
      const { viewerId } = request.body;

      assert(viewerId, viewerIdSchema);

      const userById: UserStripeDetails | null = await prisma.user.findUnique({
        where: {
          id: viewerId,
        },
        select: {
          contact: true,
          stripeId: true,
          name: true,
        },
      });

      if (!userById) {
        throw new Error('User not found');
      }
      const { contact: userEmail, stripeId: userStripeId, name: userName } = userById;

      if (!userStripeId) {
        const customer = await stripe.customers.create({ name: userName, email: userEmail });
        await prisma.user.update({
          data: {
            stripeId: customer.id,
          },
          where: {
            id: viewerId,
          },
        });
      }
      const clientSecret = await stripe.setupIntents.create({
        customer: userStripeId,
        payment_method_types: ['card'],
      });

     return response.status(200).send(clientSecret);
    } catch (error) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is:', error);
      Sentry.captureException(error);
      return response
      .status(500)
      .send({ success: false });

      // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(error.raw.payment_intent.id);
      // console.log('PI retrieved:', paymentIntentRetrieved.id);
    }
  }
};

export default withSentry(handler);
