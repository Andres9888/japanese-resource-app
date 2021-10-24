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
          console.log(element.resources);
          console.log(resource, 'this is a resource');
          if (element.resources.includes(`${resource}`)) {
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

    const kNNRecommender = new KNNRecommender([
      [
        'emptycorner',
        'item 1',
        'item 2',
        'item 3',
        'item 4',
        'item 5',
        'item 6',
        'item 7',
      ],
      ['user 1', 1, -1, 0, 0, -1, 1, 0],
      ['user 2', 1, -1, 0, 1, -1, 0, 0],
    ]);
    kNNRecommender.initializeRecommender().then(() => {
      const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(
        'user 2'
      );
      console.log(
        `new recommendation for user 2 ${userRecommendations[0].itemId}`
      );
    });
    res.status(200).json({ resources, users, reviewData });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
