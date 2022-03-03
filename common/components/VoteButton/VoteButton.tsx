import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { getUserResourcesIds as getUserResourcesIdsData } from '../../graphql/queries/__generated__/getUserResourcesIds';

import { incrementCount as incrementCountData, incrementCountVariables } from '~graphql/mutations/__generated__/incrementCount';
import { INCREMENT_COUNT } from '~graphql/mutations/mutations';
// eslint-disable-next-line camelcase
import { getResources_listings } from '~graphql/queries/__generated__/getResources';
import { displayErrorMessage } from '~lib/utils';
import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  // eslint-disable-next-line camelcase
  resource: getResources_listings;
  userResourcesIds: getUserResourcesIdsData;
  refetch: () => Promise<void>;
  refetchUserResourcesIds: () => Promise<void>;
}

const VoteButton = ({ resource, viewer, refetch, refetchUserResourcesIds, userResourcesIds }: Props) => {
  const [incrementCount] = useMutation<incrementCountData, incrementCountVariables>(INCREMENT_COUNT);
  const [disabled, setDisabled] = useState(false);

  // eslint-disable-next-line no-shadow
  const handleIncrementCount = async resource => {
    if (viewer.id) {
      console.log(userResourcesIds);
      const didVote = userResourcesIds.getUserResourceIds[0].resources.includes(resource.id);

      if (!didVote) {
        await incrementCount({
          variables: {
            id: resource.id,
            viewer: viewer.id,
            resource: resource.id,
          },
        });
        setDisabled(!disabled);
        refetch();
        refetchUserResourcesIds();
        // window.sakura.start(true);
      } else {
        displayErrorMessage('already voted on this resource');
      }
    } else {
      displayErrorMessage('most login to vote');
    }
  };
  return (
    <ThumbButton
      disabled={disabled}
      whileHover={{
        scale: 1.02,
      }}
      onClick={() => {
        handleIncrementCount(resource);
      }}
    >
      {' '}
      👍
    </ThumbButton>
  );
};

const ThumbButton = styled(motion.button)``;

export default VoteButton;
