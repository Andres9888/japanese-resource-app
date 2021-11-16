import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import {
  incrementCount as incrementCountData,
  incrementCountVariables,
} from '~graphql/mutations/__generated__/incrementCount';
import { INCREMENT_COUNT } from '~graphql/mutations/mutations';
// eslint-disable-next-line camelcase
import { getResources_listings } from '~graphql/queries/__generated__/getResources';
import { displayErrorMessage } from '~lib/utils';
import { Viewer } from '~types/globalTypes';
// import { getUserResourcesIds } from '../../graphql/queries/__generated__/getUserResourcesIds';

interface Props {
  viewer: Viewer;
  // eslint-disable-next-line camelcase
  resource: getResources_listings;
  refetch: () => Promise<void>;
}

const VoteButton = ({
  resource,
  viewer,
  refetch,
  refetchUserResourcesIds,
  userResourcesIds,
}: Props) => {
  const [incrementCount] = useMutation<
    incrementCountData,
    incrementCountVariables
  >(INCREMENT_COUNT);

  // eslint-disable-next-line no-shadow
  const handleIncrementCount = async resource => {
    if (viewer.id) {
      console.log(userResourcesIds);
      const didVote = userResourcesIds.getUserResourceIds[0].resources.some(
        votedResource => votedResource === resource.id
      );

      if (!didVote) {
        await incrementCount({
          variables: {
            id: resource.id,
            viewer: viewer.id,
            resource: resource.id,
          },
        });
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
      onClick={() => {
        handleIncrementCount(resource);
      }}
    >
      {' '}
      👍
    </ThumbButton>
  );
};

const ThumbButton = styled.button``;

export default VoteButton;
