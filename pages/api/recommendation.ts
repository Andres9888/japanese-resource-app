import KNNRecommender from 'knn-recommender';

import { connectDatabase } from '~server/database';

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
    const db = await connectDatabase();
    const resources = await db.listings.distinct('_id', {});
    const users = await db.users.aggregate(agg).toArray();

    const makeReviews = () => {
      return users.map(user => {
        const review = resources.map(resource => {
          if (user.resources.includes(`${resource}`)) {
            return 1;
          }
          return 0;
        });
        return [user._id, ...review];
      });
    };

    const reviewData = makeReviews();

    const stringResources = resources.map(element => JSON.stringify(element));

    const kNNRecommender = new KNNRecommender([['emptycorner', ...stringResources], ...reviewData]);

    kNNRecommender
      .initializeRecommender()
      .then(() => {
        const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(req.query.user);
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
