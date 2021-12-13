// @ts-nocheck

import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

import { getResources } from '~graphql/queries/__generated__/getResources';
import { RESOURCES } from '~graphql/queries/queries';
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

export default function Home({ viewer }: Props) {
  const {
    data: { listings },
    loading,
    error,
    refetch,
  } = useQuery<getResources>(RESOURCES);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const sortedData = [...listings].sort((a, b) => b.count - a.count);

  React.useEffect(() => {
    const filteredData = sortedData.filter(
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

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Japanese Resources Site</title>
        <meta content="Q7vgw_JZpE7XtVGSpkL6ZpLx3745jU_LDc6YVFzU3T8" name="google-site-verification" />
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
      <Script
        src="/static/scripts/sakura.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-ignore

          window.sakura = new Sakura('body', {
            maxSize: 30,
            colors: [
              {
                gradientColorStart: 'rgba(255, 183, 197, 0.9)',
                gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
                gradientColorDegree: 120,
              },
              {
                gradientColorStart: 'rgba(255,189,189)',
                gradientColorEnd: 'rgba(227,170,181)',
                gradientColorDegree: 120,
              },
              {
                gradientColorStart: 'rgba(212,152,163)',
                gradientColorEnd: 'rgba(242,185,196)',
                gradientColorDegree: 120,
              },
            ],
          });
          window.sakura.stop(true);
        }}
      />

      <Nav handleSearchChange={handleSearchChange} searchTerm={searchTerm} viewer={viewer} />
      <Table refetch={refetch} searchResults={searchResults} viewer={viewer} />
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
