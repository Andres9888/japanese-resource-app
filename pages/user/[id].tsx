import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Avatar, Divider } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import { RWebShare } from 'react-web-share';
import styled from 'styled-components';

import { getUserResourcesIds as getUserResourceIdsData, getUserResourcesIdsVariables } from '../../graphql/queries/__generated__/getUserResourcesIds';

import { GET_USER_RESOURCES_IDS, RESOURCES } from '~graphql/queries/queries';
import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
}
interface recommendationData {
  data: string;
}

function userPage({ viewer }: Props) {
  if (!viewer.id) {
    return <div>Log in to View Page</div>;
  }
  const { data: { getUserResourceIds } = {}, loading, error } = useQuery<getUserResourceIdsData, getUserResourcesIdsVariables>(
    GET_USER_RESOURCES_IDS,
    {
      variables: { id: viewer.id },
    }
  );

  const [recommendation, setRecommendation] = useState<recommendationData>();
  const { data: { resources } = {}, loading: loadingResources, error: errorResources } = useQuery(RESOURCES);

  // useEffect(() => {
  //   const getRecommendation = async () => {
  //     try {
  //       const { data: responseData } = await axios.get<recommendationData>(`/api/recommendation?user=${viewer.id}`);

  //       setRecommendation(responseData);
  //     } catch (error_) {
  //       console.log(error_);
  //     }
  //   };

  //   getRecommendation();
  // }, []);

  if (loading || loadingResources) {
    return <Image alt="" height={116} src="/static/images/flat_750x_075_f-pad_750x1000_f8f8f8_sh4wbg.jpg" width={538} />;
  }
  if (error || errorResources) {
    return <h2>error</h2>;
  }

  const [userVotedResourceIds] = getUserResourceIds;

  const userVotedResources = resources.filter(resource =>
    userVotedResourceIds.resources.some(({ resourceId: userVotedResourceId }) => userVotedResourceId === resource.id)
  );

  // const recommendedResource = dataResources.resources.filter(resource => resource.id === recommendation);

  return (
    <div>
      <div className="user-profile">
        <Divider />
        <div className="user-profile__avatar">
          <Avatar size={100} src={viewer.avatar} />
        </div>
        <Divider />
      </div>
      <div className="container">
        {/* <Header>You Might Like This Resource Below</Header>
        <table className="table is-fullwidth is-hoverable">
          <tbody>
            {recommendedResource.map(resource => (
              <TableRow key={resource.id}>
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
              </TableRow>
            ))}
          </tbody>
        </table> */}
        <Divider />
        <Header>Your Liked Resources</Header>
        <table className="table is-fullwidth is-hoverable">
          <tbody>
            {userVotedResources.map(resource => (
              <TableRow key={resource.id}>
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
                <TableData>
                  <RWebShare
                    data={{
                      text: resource.description,
                      url: resource.url,
                      title: resource.title,
                    }}
                    onClick={() => console.log('shared successfully!')}
                  >
                    <ShareHeader>Share 🔗</ShareHeader>
                  </RWebShare>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default userPage;

const Header = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 34px;
  font-weight: bold;
  text-align: center;
`;

const TableRow = styled.tr`
  border-radius: 6px;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 3%);
  display: flex;
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

const ShareHeader = styled.h3`
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
  font-weight: bold;
  text-align: center;
`;
