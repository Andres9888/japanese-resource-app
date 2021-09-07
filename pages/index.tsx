/* eslint-disable import/no-unresolved */
import React from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { initializeApollo } from '~lib/apolloClient'
import { LISTINGS } from '~graphql/queries/queries'
import Nav from '~views/components/Nav'
import Table from '~views/components/Table'

export default function Home ({ viewer }) {
  const {
    data: { listings },
    loading,
    error,
    refetch,
  } = useQuery(LISTINGS)

  const [searchTerm, setSearchTerm] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  const sortedData = listings.slice().sort(function (a, b) {
    return b.count - a.count
  })

  React.useEffect(() => {
    const results = sortedData.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm, listings])

  if (loading) {
    return <h1>loading</h1>
  }
  if (error) {
    return <h1>error</h1>
  }
  return (
    <>
      <Head>
        <title>Japanese Resources Site</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css'
        />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Nav
        viewer={viewer}
        searchTerm={searchTerm}
        handleChange={handleChange}
      />
      <Table searchResults={searchResults} refetch={refetch} viewer={viewer} />
    </>
  )
}

export async function getStaticProps () {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: LISTINGS,
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
    revalidate: 1,
  }
}
