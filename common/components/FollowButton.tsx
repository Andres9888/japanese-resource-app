// @ts-nocheck

import { useEffect, useState } from 'react';

import axios from 'axios';
import { FollowButton as GetStreamFollowButton } from 'react-activity-feed';

export const FollowButton = ({ getFollowing, actorID }) => {
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
  const handleClick = async () => {
    try {
      axios.post(`/api/followAction`, {
        isFollowed,
        actorID,
        currentUser: '112016378414675480907',
      });
      setIsfollowed(!isFollowed);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GetStreamFollowButton
      followed={isFollowed} // renders the button as "following"
      onClick={() => handleClick()}
    />
  );
};
