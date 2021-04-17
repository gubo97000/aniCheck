import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Vis from './Viz'
import Grid from '@material-ui/core/Grid';
import Nav from './Nav'
import Store from './Store'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { css, jsx } from '@emotion/react'

const client = new ApolloClient({ uri: 'https://graphql.anilist.co', cache: new InMemoryCache() });

ReactDOM.render(
  <React.StrictMode>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <Store>
      <ApolloProvider client={client}>
        <Grid  container>
          <Vis />
          <Nav />
        </Grid>
      </ApolloProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)
