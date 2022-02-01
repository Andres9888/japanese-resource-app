// @ts-nocheck

import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

import { getResources } from '~graphql/queries/__generated__/getResources';
import { initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';
import Nav from '~views/components/Nav';
import Table from '~views/components/Table';

declare global {
  interface Window {
    sakura: any;
  }
}
interface Props {
  viewer: Viewer;
}

export const RESOURCES = gql`
  query {
    globalTrending(first: 5, mediaType: ANIME) {
      nodes {
        slug
        titles {
          canonical
        }
        description
      }
    }
  }
`;

export default function Home({ viewer }: Props) {
  const { data, loading, error, refetch } = useQuery<getResources>(RESOURCES, { variables: { limit: 10 }, context: { clientName: 'third-party' } });

  if (loading) {
    return <Image alt="" height={116} src="/static/images/flat_750x_075_f-pad_750x1000_f8f8f8_sh4wbg.jpg" width={538} />;
  }
  if (error) {
    return <h1>error</h1>;
  }

  return (
    <>
      {data.globalTrending.nodes.map(item => (
        <Link href={`/anime/${item.slug}`}>
          <h1>{item.titles.canonical}</h1>
        </Link>
      ))}
    </>
  );
}
