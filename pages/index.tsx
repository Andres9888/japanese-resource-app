import React from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { initializeApollo } from '~lib/apolloClient'
import { LISTINGS } from '~graphql/queries/queries'
import Nav from '~views/components/Nav'
import VoteButton from '~views/components/VoteButton'
import styled from 'styled-components'

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
  let sortedData = listings.slice().sort(function (a, b) {
    return b.count - a.count
  })

  React.useEffect(() => {
    const results = sortedData.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
        || item.tags.includes(searchTerm.toLowerCase())
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
    <div>
      <Head>
        <title>Home</title>
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
      <div className='container'>
        <table className='table is-fullwidth is-hoverable'>
          <tbody>
            {searchResults.map((resource, _index) => (
              <TableRow key={resource.id}>
                <TableData>
                  <img src={resource.image} alt='' />
                </TableData>
                <TableDataTitle>
                  <a href={resource.url}>{resource.title}</a>
                </TableDataTitle>
                <TableDataDescription>
                  {resource.description}
                </TableDataDescription>

                <TableData>
                  <div className='field is-grouped is-grouped-multiline'>
                    {resource.tags.map(tag => (
                      <div
                        key={`${resource.id + '-' + tag}`}
                        className='control'
                      >
                        <div className='tags has-addons'>
                          <a className='tag is-link'>{tag}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableData>
                <TableData>
                  <VoteButton
                    refetch={refetch}
                    resource={resource}
                    viewer={viewer}
                  />
                  <span>{resource.count}</span>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = styled.tr`
  display: flex;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 3%);
  border-radius: 6px;
`

const TableData = styled.td`
  display: flex;
  flex-direction: column;
  border: none !important;
  font-size: 48px;
  font-weight: 700;
  align-self: center;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5715;
  padding:0 !important;
  
  padding-top: .5em !important;
  padding-bottom: .5em !important;
  width:100%;
  overflow-wrap: break-word;

  a {
    text-align: center;
  }
  
  img {
    max-width: 233px;
    border-radius: 6px;
  }
  span{
    align-self: center;
  }
  .field{
    align-self: center;
    text-transform:capitalize;
  }
  .field.is-grouped{
    flex-direction: column;
  }
`
const TableDataTitle = styled.td`
  display: flex;
  flex-direction: column;
  border: none !important;
  font-size: 34px;
  font-weight: 700;
  align-self: center;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5715;
  

  width:100%;
  a {
    text-align: center;
  }
`
const TableDataDescription = styled.td`
  border: none !important;
  font-family: 'Source Sans Pro', sans-serif;
  max-width: 377px;
  display: flex;
  width: 200%;
  line-height: 1.5715;
  text-align: center;
  flex-direction: column;
  font-size: 21px;
  font-weight: 400;
  align-self: center;
  a {
    text-align: center;
  }
`

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
