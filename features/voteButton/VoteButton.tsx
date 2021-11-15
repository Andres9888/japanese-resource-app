import React, { useState } from 'react';

import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import {
  incrementCount as incrementCountData,
  incrementCountVariables,
} from '~graphql/mutations/__generated__/incrementCount';
import { INCREMENT_COUNT } from '~graphql/mutations/mutations';
// eslint-disable-next-line camelcase
import { getResources_listings } from '~graphql/queries/__generated__/getResources';
import { GET_USER_RESOURCES_IDS } from '~graphql/queries/queries';
import { initializeApollo } from '~lib/apolloClient';
import { displaySuccessNotification, displayErrorMessage } from '~lib/utils';
import { Viewer } from '~types/globalTypes';
// import { getUserResourcesIds } from '../../graphql/queries/__generated__/getUserResourcesIds';

interface Props {
  viewer: Viewer;
  // eslint-disable-next-line camelcase
  resource: getResources_listings;
  refetch: () => Promise<void>;
}

const VoteButton = ({ resource, viewer, refetch }: Props) => {
  const [incrementCount] = useMutation<
    incrementCountData,
    incrementCountVariables
  >(INCREMENT_COUNT);

  const [
    getUserResourcesIds,
    { data, refetch: refetchUserResourcesIds, loading, error },
  ] = useLazyQuery(GET_USER_RESOURCES_IDS);

  const [disabled, setDisabled] = useState(false);
  // eslint-disable-next-line no-shadow
  const handleIncrementCount = async resource => {
    if (viewer.id) {
      getUserResourcesIds({ variables: { id: viewer.id } });

      const didVote = await data.getUserResourcesIds.userResourcesIds[0].some(
        votedResource => votedResource === resource.id
      );

      if (!didVote && !disabled) {
        await incrementCount({
          variables: {
            id: resource.id,
            viewer: viewer.id,
            resource: resource.id,
          },
        });
      } else {
        displayErrorMessage('already voted on this resource');
      }

      refetchUserResourcesIds();
      // setDisabled(true);
      refetch();
      // window.sakura.start(true);
    } else {
      displayErrorMessage('most login to vote');
    }
  };
  return (
    <ThumbButton
      disabled={disabled}
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
