import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import { INCREMENT_COUNT } from '~graphql/mutations/mutations';
// eslint-disable-next-line camelcase
import { getResources_listings } from '~graphql/queries/__generated__/getResources';
import { CHECK_USER_VOTE } from '~graphql/queries/queries';
import { initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  // eslint-disable-next-line camelcase
  resource: getResources_listings;
  refetch: () => Promise<void>;
}

const VoteButton = ({ resource, viewer, refetch }: Props) => {
  const [incrementCount] = useMutation(INCREMENT_COUNT);
  const [disabled, setDisabled] = useState(false);
  // eslint-disable-next-line no-shadow
  const handleIncrementCount = async resource => {
    if (viewer.id) {
      const client = initializeApollo();
      const {
        data: { checkUserVote: didVote },
      } = await client.query({
        query: CHECK_USER_VOTE,
        variables: {
          id: viewer.id,
          resource: resource.id,
        },
      });

      if (didVote.length === 0) {
        await incrementCount({
          variables: {
            id: resource.id,
            viewer: viewer.id,
            resource: resource.id,
          },
        });
        window.sakura.start(true)
        setDisabled(!disabled);
        refetch();
      } else {
        alert('already voted on this resource');
      }
    } else {
      alert('most login to vote');
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
