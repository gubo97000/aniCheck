import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Vis from './Viz'
import Grid from '@material-ui/core/Grid';
import Nav from './Nav'
import Store from './Store'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({ uri: 'https://graphql.anilist.co', cache: new InMemoryCache() });

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <ApolloProvider client={client}>
        <Grid container>
          
            <Vis />
          
          <Grid item xs={3}>
            <Nav />
          </Grid>
        </Grid>
      </ApolloProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)
