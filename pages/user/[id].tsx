import React from 'react';

import styled from 'styled-components';
import { Avatar, Card, Divider, Typography } from 'antd';
import NavBlank from '~views/components/NavBlank';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_RESOURCES_IDS, RESOURCES } from '~graphql/queries/queries';
import { EmailShareButton } from 'react-share';

const { Paragraph, Text, Title } = Typography;

function userPage({ viewer }) {
  const { data, loading, error, refetch } = useQuery(GET_USER_RESOURCES_IDS, {
    variables: { id: viewer.id },
  });

  const {
    data: dataResources,
    loading: loadingResources,
    error: errorResources,
  } = useQuery(RESOURCES);

  if (loading || loadingResources) {
    return <h2>loading</h2>;
  }
  if (error || errorResources) {
    <h2>error</h2>;
  }

  const filtered = dataResources.listings.filter(
    resource => data.getUserResourceIds[0].resources.indexOf(resource.id) > -1
  );

  return (
    <div>
      <NavBlank viewer={viewer} />
      <div className="user-profile">
        <Card className="user-profile__card">
          <div className="user-profile__avatar">
            <Avatar size={100} src={viewer.avatar} />
          </div>
          <Divider />
        </Card>
      </div>
      <div className="container">
        <table className="table is-fullwidth is-hoverable">
          <tbody>
            {filtered.map((resource, _index) => (
              <TableRow key={resource.id}>
                <TableData>
                  <a href={resource.url} target="_blank">
                    <img src={resource.image} alt="" />
                  </a>
                </TableData>
                <TableDataTitle>
                  <a href={resource.url} target="_blank">
                    {resource.title}
                  </a>
                </TableDataTitle>
                <TableDataDescription>
                  <a href={resource.url} target="_blank">
                    {resource.description}
                  </a>
                </TableDataDescription>
                <TableData>
                  <EmailShareButton
                    subject="hey check out these cool japanese resources"
                    body={`${resource.title}: ${resource.url}`}
                    separator=":"
                  >
                    <h2>email link</h2>
                  </EmailShareButton>
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
