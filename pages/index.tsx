// @ts-nocheck

import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Image from 'next/image';

import FilterByTag from '~common/components/FilterByTag';
import ResourceTable from '~common/components/ResourceTable';
import { getResources } from '~graphql/queries/__generated__/getResources';
import { RESOURCES } from '~graphql/queries/queries';
import { initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export default function Home({ viewer, searchTerm, setSearchTerm }: Props) {
  const {
    data: { listings },
    loading,
    error,
    refetch,
  } = useQuery<getResources>(RESOURCES);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const filteredData = listings.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, listings]);

  if (loading) {
    return <Image alt="" height={116} src="/static/images/flat_750x_075_f-pad_750x1000_f8f8f8_sh4wbg.jpg" width={538} />;
  }
  if (error) {
    return <h1>error</h1>;
  }

  return (
    <>
      <Head>
        <title>Japanese Resources Site</title>

        <meta
          content="Finding Quality Japanese Resources can be hard to find in the beginning. This site is here to make it easier for you. I currated a list of Japanese study material that I found useful and wanted to share. You can search and filter what type of resources and vote, track, and share the resources you like."
          name="description"
        />
      </Head>
      <div className="container">
        <FilterByTag setSearchTerm={setSearchTerm} />
        <ResourceTable refetch={refetch} searchResults={searchResults} viewer={viewer} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RESOURCES,
  });
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  };
}
