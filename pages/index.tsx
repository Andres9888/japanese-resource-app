// @ts-nocheck

import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Script from 'next/script';

import { getResources } from '~graphql/queries/__generated__/getResources';
import { RESOURCES } from '~graphql/queries/queries';
import { initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';
import Nav from '~views/components/Nav';
import Table from '~views/components/Table';

interface Props {
  viewer: Viewer;
}
export default function Home({ viewer }: Props) {
  const {
    data: { listings },
    loading,
    error,
    refetch,
  } = useQuery<getResources>(RESOURCES);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  const sortedData = listings.slice().sort((a, b) => b.count - a.count);

  React.useEffect(() => {
    const results = sortedData.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, listings]);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }
  return (
    <>
      <Head>
        <title>Japanese Resources Site</title>
      </Head>
      <Script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-ignore
          kofiWidgetOverlay.draw('andres9888', {
            type: 'floating-chat',
            'floating-chat.donateButton.text': 'Buy me Coffee',
            'floating-chat.donateButton.background-color': '#1890ff',
            'floating-chat.donateButton.text-color': '#fff',
          });
        }}
      />
      <Nav
        handleChange={handleChange}
        searchTerm={searchTerm}
        viewer={viewer}
      />
      <Table refetch={refetch} searchResults={searchResults} viewer={viewer} />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RESOURCES,
  });
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
    revalidate: 1,
  };
}
