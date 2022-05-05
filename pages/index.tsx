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

const loadingImageUrl = '/static/images/japanese-loading-text-bar.jpg';

interface Props {
  viewer: Viewer;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const Home = ({ viewer, searchTerm, setSearchTerm }: Props) => {
  const {
    data: { resources },
    loading,
    error,
    refetch,
  } = useQuery<getResources>(RESOURCES);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const filteredData = resources.filter(
      ({ title, description, tags }) =>
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tags.name.includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, resources]);

  if (loading) {
    return <Image alt="" height={116} src={loadingImageUrl} width={538} />;
  }
  if (error) {
    return <h1>Sorry, just message me and I will try to fix it</h1>;
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
};

export default Home;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RESOURCES,
  });
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  };
}
