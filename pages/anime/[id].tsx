import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  query query($slug: String!) {
    findAnimeBySlug(slug: $slug) {
      titles {
        canonical
      }
      description
    }
  }
`;

export default function Home({ viewer }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, refetch } = useQuery<getResources>(RESOURCES, { variables: { slug: id }, context: { clientName: 'third-party' } });

  if (loading) {
    return <Image alt="" height={116} src="/static/images/flat_750x_075_f-pad_750x1000_f8f8f8_sh4wbg.jpg" width={538} />;
  }
  if (error) {
    return <h1>error</h1>;
  }

  return (
    <>
      <h1>{data.findAnimeBySlug.titles.canonical}</h1>
      <p>{data.findAnimeBySlug.description.en}</p>
    </>
  );
}
