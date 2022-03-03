// @ts-nocheck
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

import { getUserResourcesIds as getUserResourceIdsData, getUserResourcesIdsVariables } from '../../graphql/queries/__generated__/getUserResourcesIds';

import VoteButton from '~common/components/VoteButton';
import { getResources } from '~graphql/queries/__generated__/getResources';
import { GET_USER_RESOURCES_IDS } from '~graphql/queries/queries';
import { displayErrorMessage } from '~lib/utils';
import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  searchResults: getResources;
  refetch: () => Promise<void>;
}

export default function Table({ viewer, searchResults, refetch }: Props) {
  const { data, loading, refetch: refetchUserResourcesIds } = useQuery<getUserResourceIdsData, getUserResourcesIdsVariables>(GET_USER_RESOURCES_IDS, {
    variables: { id: viewer.id },
    skip: !viewer.id,
  });

  const renderVoteButton = resource => {
    if (loading) {
      return null;
    }

    if (data && viewer.id) {
      return (
        <>
          <VoteButton
            refetch={refetch}
            refetchUserResourcesIds={refetchUserResourcesIds}
            resource={resource}
            userResourcesIds={data}
            viewer={viewer}
          />
          <span>{resource.count}</span>
        </>
      );
    }

    return (
      <>
        <ThumbButton
          whileHover={{
            scale: 1.02,
          }}
          onClick={() => {
            displayErrorMessage('most login to vote');
          }}
        >
          {' '}
          👍
        </ThumbButton>
        <span>{resource.count}</span>
      </>
    );
  };

  return (
    <div className="container">
      <table className="table is-fullwidth is-hoverable">
        <tbody>
          {searchResults.map(resource => (
            <TableRow
              key={resource.id}
              whileHover={{
                scale: 1.02,
              }}
            >
              <TableData>
                <a href={resource.url} rel="noreferrer" target="_blank">
                  <Image alt="" height={200} src={resource.image} width={200} />
                </a>
              </TableData>
              <TableDataTitle>
                <a href={resource.url} rel="noreferrer" target="_blank">
                  {resource.title}
                </a>
              </TableDataTitle>
              <TableDataDescription>
                <a href={resource.url} rel="noreferrer" target="_blank">
                  {resource.description}
                </a>
              </TableDataDescription>
              <TableDataTags>
                <div className="field is-grouped is-grouped-multiline">
                  {resource.tags.map(tag => (
                    <div key={`${`${resource.id}-${tag}`}`} className="control">
                      <div className="tags has-addons">
                        <span className="tag is-link">{tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TableDataTags>
              <TableDataVoteContainer>{renderVoteButton(resource)}</TableDataVoteContainer>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TableRow = styled(motion.tr)`
  border-radius: 6px;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 3%);
  display: flex;
  &:hover {
    background-color: #fef4f438 !important;
    border: 1px #fb898759 groove;
  }
`;

const TableData = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.5715;
  overflow-wrap: break-word;

  padding: 0 !important;
  padding-bottom: 0.5em !important;
  padding-top: 0.5em !important;
  width: 100%;

  a {
    text-align: center;
  }

  img {
    border-radius: 6px;
    max-width: 233px;
  }
  span {
    align-self: center;
  }
  .field {
    align-self: center;
    text-transform: capitalize;
  }
  .field.is-grouped {
    flex-direction: column;
  }
`;

const TableDataTitle = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size: 34px;
  @media (max-width: 800px) {
    font-size: 21px;
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
  font-weight: 700;
  line-height: 1.5715;

  width: 100%;
  a {
    color: black;
    text-align: center;
  }
  a:hover {
    text-decoration: underline;
  }
`;
const TableDataDescription = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 21px;
  @media (max-width: 800px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
  }
  font-weight: 400;
  line-height: 1.5715;
  max-width: 377px;
  text-align: center;
  width: 200%;
  a {
    color: black;
    text-align: center;
  }
`;
const TableDataTags = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;

  font-weight: 700;
  line-height: 1.5715;
  overflow-wrap: break-word;

  padding: 0 !important;
  padding-bottom: 0.5em !important;
  padding-top: 0.5em !important;
  width: 100%;

  a {
    text-align: center;
  }

  img {
    border-radius: 6px;
    max-width: 233px;
  }
  span {
    align-self: center;
  }
  .field {
    align-self: center;
    text-transform: capitalize;
  }
  .field.is-grouped {
    flex-direction: column;
  }
  .tag {
    @media (max-width: 800px) {
      font-size: 10px !important;
    }
    @media (max-width: 600px) {
      font-size: 8px !important;
    }
  }
`;

const TableDataVoteContainer = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  @media (max-width: 800px) {
    font-size: 34px;
  }
  @media (max-width: 600px) {
    font-size: 21px;
  }
  font-weight: 700;
  line-height: 1.5715;
  overflow-wrap: break-word;

  padding: 0 !important;
  padding-bottom: 0.5em !important;
  padding-top: 0.5em !important;
  width: 100%;

  a {
    text-align: center;
  }

  img {
    border-radius: 6px;
    max-width: 233px;
  }
  span {
    align-self: center;
  }
  .field {
    align-self: center;
    text-transform: capitalize;
  }
  .field.is-grouped {
    flex-direction: column;
  }
`;

const ThumbButton = styled(motion.button)``;
