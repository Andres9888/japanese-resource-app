import { PrismaClient } from '@prisma/client';
import KNNRecommender from 'knn-recommender';

import { connectDatabase } from '~server/database';

const prisma = new PrismaClient();

const agg = [
  {
    $project: {
      _id: 1,
      resources: 1,
    },
  },
];

export default async (req, res) => {
  try {
    const database = await connectDatabase();
    const resources = await database.listings.distinct('_id', {});
    const users = await database.users.aggregate(agg).toArray();
    // const resources = await prisma.resource.findMany({
    //   select: {
    //     id: true,
    //   },
    // });
    // const users = await prisma.user.findMany({
    //   select: {
    //     id: true,
    //     resources: true,
    //   },
    // });

    const makeReviews = () =>
      users.map(user => {
        const review = resources.map(resourceId => (user.resources.includes(`${resourceId}`) ? 1 : 0));
        return [user._id, ...review];
      });

    const reviewData = makeReviews();

    const stringResources = resources.map(resource => JSON.stringify(resource));

    // const kNNRecommender = new KNNRecommender([['emptycorner', 'item 1', 'item 2', 'item 3', 'item 4','item 5', 'item 6', 'item 7'], ['user 1', 1, -1, 0, 0, -1, 1, 0], ['user 2', 1, -1, 0, 1, -1, 0, 0]])
    // kNNRecommender.initializeRecommender().then(() => {
    //     const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId('user 2')
    //     console.log(`new recommendation for user 2 ${userRecommendations[0].itemId}`)
    // })

    const kNNRecommender = new KNNRecommender([['emptycorner', ...stringResources], ...reviewData]);

    kNNRecommender
      .initializeRecommender()
      .then(() => {
        const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId('112016378414675480907');
        console.log('🚀 ~ file: recommendation.ts ~ line 57 ~ .then ~ userRecommendations', userRecommendations);

        console.log(`new recommendation for ${req.query.user} ${userRecommendations[0].itemId}`);
        res.status(200).send(userRecommendations[0].itemId);
      })
      .catch(error => {
        console.error(error);
        return res.status(400).send({
          message: `${error}`,
        });
      });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
