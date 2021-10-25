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

    const kNNRecommender = new KNNRecommender([
      ['emptycorner', ...stringResources],
      ...reviewData,
    ]);

    kNNRecommender
      .initializeRecommender()
      .then(() => {
        const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(
          req.query.user
        );
        console.log(
          `new recommendation for ${req.query.user} ${userRecommendations[0].itemId}`
        );
        res.status(200).send(userRecommendations[0].itemId);
      })
      .catch(err => {
        console.error(err);
        return res.status(400).send({
          message: `${err}`,
        });
      });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
