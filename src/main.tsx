import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Vis from './Viz'
import Grid from '@material-ui/core/Grid';
import Nav from './Nav'
import { SharedStateProvider } from './Store'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { css, jsx } from '@emotion/react'
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';

const client = new ApolloClient({ uri: 'https://graphql.anilist.co', cache: new InMemoryCache() });

ReactDOM.render(
  <React.StrictMode>
    <SharedStateProvider>
      <ApolloProvider client={client}>
        <Theme>
          <Grid container>
            <Vis />
            <Nav />
          </Grid>
        </Theme>
      </ApolloProvider>
    </SharedStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
