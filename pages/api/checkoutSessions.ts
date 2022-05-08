/* tslint:disable */
/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import { withSentry } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { assert, string } from 'superstruct';

const prisma = new PrismaClient();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const viewerIdSchema = string();

type UserStripeDetails = {
  contact: string;
  name: string;
  stripeId: string | null;
};
type ResponseData = {
  client_secret?: string;
  success?: boolean;
};
const handler = async (request, response /* : NextApiResponse<ResponseData> */) => {
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
        const customer = await stripe.customers.create({ name: userName, email: userEmail, metadata: { hostId: viewerId } });
        await prisma.user.update({
          data: {
            stripeId: customer.id,
          },
          where: {
            id: viewerId,
          },
        });
      }
      const stripeSetupIntentResponse = await stripe.setupIntents.create({
        customer: userStripeId,
        payment_method_types: ['card'],
      });

      return response.status(200).json({ client_secret: stripeSetupIntentResponse.client_secret });
    } catch (error) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is:', error);
      Sentry.captureException(error);
      return response.status(500).json({ success: false });

      // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(error.raw.payment_intent.id);
      // console.log('PI retrieved:', paymentIntentRetrieved.id);
    }
  }
};

export default withSentry(handler);
