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

export default async (_req, res) => {
  try {
    const db = await connectDatabase();
    const resources = await db.listings.distinct('_id', {});
    const users = await db.users.aggregate(agg).toArray();

    const makeReview = () => {
      const reviews = [];

      users.forEach(element => {
        let review = [];
        review.push(element._id);
        resources.forEach(resource => {
          if (element.resources === undefined) {
          } else if (element.resources.includes(`${resource}`)) {
            review.push(1);
          } else {
            review.push(0);
          }
        });

        reviews.push(review);
        review = [];
      });

      return reviews;
    };

    const reviewData = makeReview();

    const stringResources = resources.map(element => JSON.stringify(element));

    console.log([['empty', ...stringResources], ...reviewData]);

    const kNNRecommender = new KNNRecommender([
      ['emptycorner', ...stringResources],
      ...reviewData,
    ]);
    kNNRecommender.initializeRecommender().then(() => {
      const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(
        '101486254571069117979'
      );
      console.log(
        `new recommendation for 101486254571069117979 ${userRecommendations[0].itemId}`
      );
    });
    res.status(200).json({ resources, users, reviewData });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
