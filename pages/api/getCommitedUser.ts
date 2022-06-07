// @ts-nocheck
/* eslint-disable */
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-east-1' });
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

      // Create an SQS service object
      const sqs = new AWS.SQS({
        apiVersion: '2012-11-05',
      });

      for (const stripeId of userStripeIdsToCharge) {
        const parameters = {
          MessageGroupId: 'TestGroup',

          MessageBody: `{"stripeId": "${stripeId}"}`,
          // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
          // MessageGroupId: "Group1",  // Required for FIFO queues
          QueueUrl: 'https://sqs.us-east-1.amazonaws.com/316703392763/chargeUsers.fifo',
        };

        sqs.sendMessage(parameters, (error, data) => {
          if (error) {
            console.log('Error', error);
          } else {
            console.log('Success', data.MessageId);
          }
        });
      }

      response.status(200).json({ message: 'success', usersCharged: userStripeIdsToCharge, UsersChargedInfo: usersToCharge });
    } catch (error) {
      console.log('Error code is:', error);

      response.status(500).json({ message: 'failed' });
    }
  }
}
