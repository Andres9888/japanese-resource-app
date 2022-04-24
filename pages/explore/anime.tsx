// @ts-nocheck
/* eslint-disable */
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Card, Col, Row } from 'antd';
import gql from 'graphql-tag';
import Image from 'next/image';
import Link from 'next/link';

export const RESOURCES = gql`
  query {
    globalTrending(first: 5, mediaType: ANIME) {
      nodes {
        slug
        posterImage {
          original {
            url
          }
        }
        titles {
          canonical
        }
        description
      }
    }
  }
`;

export default function ExploreAnime({ viewer }: Props) {
  const { data, loading, error } = useQuery(RESOURCES, { variables: { limit: 10 }, context: { clientName: 'third-party' } });

  if (loading) {
    return <Image alt="" height={116} src="/static/images/flat_750x_075_f-pad_750x1000_f8f8f8_sh4wbg.jpg" width={538} />;
  }
  if (error) {
    return <h1>error</h1>;
  }
  const gridStyle = {
    width: '20%',
    textAlign: 'center',
  };

  const globalTrending = data ? data.globalTrending.nodes : undefined;

  return (
    <>
      <Card title="Card Title">
        {globalTrending.map(({ slug, posterImage, titles }) => (
          <Link href={`/anime/${slug}`}>
            <Card.Grid hoverable bordered={false} style={gridStyle} title={titles.canonical}>
              <img src={posterImage.original.url} />
            </Card.Grid>
          </Link>
        ))}
      </Card>
    </>
  );
}
