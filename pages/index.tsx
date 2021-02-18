import React from 'react'
import Head from 'next/head'
import Nav from '~views/components/Nav'


const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css" />
    </Head>

    <Nav />
    <div className="container">
    <h1>Resources for Studying Japanese</h1>
    <table className="table">
  <thead>
    <tr>
      <th><abbr title="Position">Image</abbr></th>
      <th><abbr title="Played">Title</abbr></th>
      <th><abbr title="Won">Description</abbr></th>
      <th><abbr title="Drawn">Tags</abbr></th>
      <th><abbr title="Lost">Actions</abbr></th>
    </tr>
  </thead>
  <tfoot>
  <thead><tr><th><h1>Tools</h1></th></tr></thead>
    <tr>
    <th><abbr title="Position">Image</abbr></th>
      <th><abbr title="Played">Tae Kim's Guide to Learning Japanese </abbr></th>
      <th><abbr title="Won">Description</abbr>(good for supplementary learning/explanations)</th>
      <th><abbr title="Drawn">Tags</abbr></th>
      <th><abbr title="Lost">Actions</abbr></th>
    </tr>
  </tfoot>
  <tbody>
    <tr>
    <td><abbr title="Position">Image</abbr></td>
      <td><abbr title="Played">Title</abbr></td>
      <td><abbr title="Won">Description</abbr></td>
      <td><abbr title="Drawn">Tags</abbr></td>
      <td><abbr title="Lost">Actions</abbr></td>
    </tr>
    <tr className="is-selected">
    <td><abbr title="Position">Image</abbr></td>
      <td><abbr title="Played">Title</abbr></td>
      <td><abbr title="Won">Description</abbr></td>
      <td><abbr title="Drawn">Tags</abbr></td>
      <td><abbr title="Lost">Actions</abbr></td>
    </tr>
  </tbody>
</table>
  </div>
  </div>
)

export default Home
