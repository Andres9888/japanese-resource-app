import { useEffect, useState } from 'react';

import { FollowButton as GetStreamFollowButton } from 'react-activity-feed';

export const FollowButton = ({ getFollowing, actorID, handleClick }) => {
  const [isFollowed, setIsfollowed] = useState();
  useEffect(() => {
    const getIsFollowed = async () => {
      const {
        isFollowing: { results },
      } = await getFollowing(actorID);

      results.length > 0 ? setIsfollowed(true) : setIsfollowed(false);
    };

    getIsFollowed();
  }, []);
  return (
    <GetStreamFollowButton
      followed={isFollowed} // renders the button as "following"
      onClick={() => handleClick(isFollowed, actorID)}
    />
  );
};
